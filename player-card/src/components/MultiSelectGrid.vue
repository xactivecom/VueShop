<script setup lang="ts" generic="T extends Record<string, any>">
import { ref, computed } from "vue";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface ColumnConfig<T> {
  key: keyof T;
  label: string;
  width?: number; // Column width in grid units (1-12)
  format?: (value: any) => string;
}

// Properties interface
interface Props<T> {
  items: T[];
  columns: ColumnConfig<T>[];
  idKey: keyof T;
  displayKey: keyof T;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyStateText?: string;
  modelValue?: Set<string | number>;
}

// Define propeties with defaults
const props = withDefaults(defineProps<Props<T>>(), {
  placeholder: "Search and select items ...",
  searchPlaceholder: "Search...",
  emptyStateText: "No items found.",
  modelValue: () => new Set(),
});

// Define emits
const emit = defineEmits<{
  "update:modelValue": [value: Set<string | number>]
}>();

const open = ref(false);
const searchQuery = ref("");

// Use modelValue from props for selected items
const selectedItems = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value)
});

const filteredItems = computed(() => {
  if (!searchQuery.value) return props.items  
  const query = searchQuery.value.toLowerCase()
  return props.items.filter(item => 
    props.columns.some(col => {
      const value = item[col.key]
      return value?.toString().toLowerCase().includes(query)
    })
  )
});

const toggleItem = (itemId: string | number) => {
  const newSet = new Set(selectedItems.value);
  if (newSet.has(itemId)) {
    newSet.delete(itemId);
  } else {
    newSet.add(itemId);
  }
  selectedItems.value = newSet;
};

const selectedCount = computed(() => selectedItems.value.size);

const selectedItemNames = computed(() => {
  return props.items
    .filter(item => selectedItems.value.has(item[props.idKey] as string | number))
    .map(item => item[props.displayKey])
    .join(', ');
});

// Calculate grid column classes based on width config
const totalWidth = computed(() => 
  props.columns.reduce((sum, col) => sum + (col.width || 1), 0) + 1 // +1 for checkbox
);

const getColumnClass = (width?: number) => {
  const w = width || 1;
  return `col-span-${w}`;
};

const formatValue = (item: T, column: ColumnConfig<T>) => {
  const value = item[column.key];
  return column.format ? column.format(value) : value?.toString() || "";
};
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-full justify-between"
      >
        <span v-if="selectedCount === 0" class="text-muted-foreground">
          {{ placeholder }}
        </span>
        <span v-else class="truncate">
          {{ selectedCount }} item{{ selectedCount !== 1 ? "s" : "" }} selected
        </span>
        <svg
          class="ml-2 h-4 w-4 shrink-0 opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </Button>
    </PopoverTrigger>

    <PopoverContent class="w-[600px] p-0" align="start">
      <Command v-model:search-term="searchQuery">
        <CommandInput :placeholder="searchPlaceholder" />
        <CommandList>
          <CommandEmpty>No items found.</CommandEmpty>
          <CommandGroup>
            <div class="max-h-[400px] overflow-auto">
              <!-- Table Header -->
              <div class="sticky top-0 bg-background border-b grid grid-cols-12 gap-2 px-2 py-2 font-semibold text-sm">
                <div class="col-span-1"></div>
                <div
                  v-for="column in columns"
                  :key="String(column.key)"
                  :class="getColumnClass(column.width)"
                >
                  {{ column.label }}
                </div>
              </div>
              
              <!-- Table Rows -->
              <CommandItem
                v-for="item in filteredItems"
                :key="String(item[idKey])"
                :value="String(item[idKey])"
                @select="toggleItem(item[idKey])"
                class="grid grid-cols-12 gap-2 px-2 py-3 cursor-pointer"
              >
                <div class="col-span-1 flex items-center">
                  <Checkbox
                    :checked="selectedItems.has(item[idKey])"
                    @click.stop="toggleItem(item[idKey])"
                  />
                </div>
                <div
                  v-for="column in columns"
                  :key="String(column.key)"
                  :class="getColumnClass(column.width)"
                >
                  {{ formatValue(item, column) }}
                </div>
              </CommandItem>
            </div>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>

</template>
