<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue"
import { X, ChevronsUpDown, Search, Check } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { 
  Command, CommandGroup, CommandItem, CommandList, 
  CommandInput, CommandEmpty 
} from "@/components/ui/command"

export type Item = { id: string | number; label: string; value?: string }

// Props
const props = defineProps<{
  items?: Item[]                      // local items mode (optional if using fetchItems)
  modelValue?: Item | null            // selected item
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  maxHeight?: string                  // e.g. "h-60"
  debounceMs?: number                 // async debounce
  fetchItems?: (query: string) => Promise<Item[]> // async mode (optional)
}>()

const emit = defineEmits<{
  (e: "update:modelValue", v: Item | null): void
  (e: "select", v: Item): void
  (e: "clear"): void
  (e: "open-change", v: boolean): void
}>()

const open = ref(false)
const query = ref("")
const selected = ref<Item | null>(props.modelValue ?? null)
watch(() => props.modelValue, v => { selected.value = v ?? null })

// --- Local filtering (when items provided) ---
const normalizedLocal = computed(() =>
  (props.items ?? []).map(i => ({ ...i, value: i.value ?? i.label.toLowerCase() }))
)

const filteredLocal = computed(() => {
  if (!props.items || props.fetchItems) return [] as Item[]
  const q = query.value.trim().toLowerCase()
  if (!q) return normalizedLocal.value
  return normalizedLocal.value.filter(i => i.value!.includes(q))
})

// --- Async mode (when fetchItems provided) ---
const loading = ref(false)
const asyncResults = ref<Item[]>([])
let t: number | undefined

watch(query, (q) => {
  if (!props.fetchItems) return
  window.clearTimeout(t)
  const wait = props.debounceMs ?? 200
  t = window.setTimeout(async () => {
    loading.value = true
    try {
      asyncResults.value = await props.fetchItems!(q)
    } finally {
      loading.value = false
    }
  }, wait)
}, { immediate: true })

const listToShow = computed<Item[]>(() => {
  if (props.fetchItems) return asyncResults.value
  return filteredLocal.value
})

function pick(item: Item) {
  selected.value = item
  emit("update:modelValue", item)
  emit("select", item)
  open.value = false
  query.value = ""
}

function clear() {
  selected.value = null
  emit("update:modelValue", null)
  emit("clear")
  // keep query as-is so the list can still filter, or reset if you prefer:
  // query.value = ""
}

// --- Highlight matched text in results ---
function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

const highlight = (label: string) => {
  const q = query.value.trim()
  if (!q) return escapeHtml(label)
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig")
  return escapeHtml(label).replace(re, "<mark>$1</mark>")
}

onMounted(() => {
  // open popover when focusing trigger via keyboard, optional UX tweak
})
</script>

<template>
  <Popover v-model:open="open" @update:open="emit('open-change', $event)">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-full justify-between gap-2"
        @click="open = !open"
      >
        <div class="flex items-center gap-2 min-w-0">
          <Search class="h-4 w-4 opacity-70 shrink-0" />
          <span class="truncate">
            {{ selected?.label ?? placeholder ?? "Search…" }}
          </span>
        </div>
        <div class="ml-auto flex items-center gap-1">
          <button
            v-if="selected"
            class="rounded p-1 hover:bg-muted"
            aria-label="Clear selection"
            @click.stop="clear"
          >
            <X class="h-4 w-4" />
          </button>
          <ChevronsUpDown class="h-4 w-4 opacity-60" />
        </div>
      </Button>
    </PopoverTrigger>

    <PopoverContent class="w-[--radix-popover-trigger-width] p-0">
      <Command>
        <CommandInput
          v-model="query"
          :placeholder="searchPlaceholder ?? 'Type to search…'"
        />
        <CommandEmpty>
          <span v-if="loading">Searching…</span>
          <span v-else>{{ emptyText ?? "No results found." }}</span>
        </CommandEmpty>

        <CommandList :class="maxHeight ?? 'max-h-64'">
          <CommandGroup>
            <CommandItem
              v-for="item in listToShow"
              :key="item.id"
              :value="item.value ?? item.label.toLowerCase()"
              @select="pick(item)"
              class="flex items-center gap-2"
            >
              <Check
                class="h-4 w-4"
                :class="selected?.id === item.id ? 'opacity-100' : 'opacity-0'"
              />
              <span class="truncate" v-html="highlight(item.label)"></span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
