<script setup lang="ts">
import { ref, computed } from "vue";
import { Button } from "@/components/ui/button";
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
import { Check, ChevronDown } from "lucide-vue-next";

// Definition for select item
export interface SingleSelectItem {
  id: string;
  label: string;
}

// Properties interface
interface Props<SingleSelectItem> {
  items: SingleSelectItem[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyStateText?: string;
  groupHeading?: string;
  buttonClass?: string;
  popoverClass?: string;
  listClass?: string;
  maxVisibleItems?: number;
  modelValue?: SingleSelectItem | null;
}

// Define propeties with defaults
// listClass: height 36px + (5 items * 44px)
const props = withDefaults(defineProps<Props<SingleSelectItem>>(), {
  placeholder: "Select item...",
  searchPlaceholder: "Search items...",
  emptyStateText: "No items found.",
  groupHeading: "Items",
  buttonClass: "w-[300px] justify-between",
  popoverClass: "w-[300px] p-0",
  listClass: "max-h-[256px] overflow-y-auto",
  maxVisibleItems: 5,
  modelValue: null,
});

// Define emits
const emit = defineEmits<{
  "update:modelValue": [value: SingleSelectItem | null];
  "select": [item: SingleSelectItem];
}>();

// Reactive state
const open = ref(false);
const searchValue = ref("");
const selectedItem = ref<SingleSelectItem | null | undefined>(props.modelValue);

// Computed properties
const displayValue = computed(() => {
  return selectedItem.value 
    ? selectedItem.value.label 
    : props.placeholder;
});

const filteredItems = computed(() => {
  if (!searchValue.value) return props.items;
  
  return props.items.filter(item =>
    item.label
      .toLowerCase()
      .includes(searchValue.value.toLowerCase())
  );
});

const selectItem = (item: SingleSelectItem) => {
  selectedItem.value = item;
  open.value = false;
  searchValue.value = "";
  
  // Emit events
  emit("update:modelValue", item);
  emit("select", item);
};

// Watch for external modelValue changes
import { watch } from "vue";
watch(() => props.modelValue, (newValue) => {
  selectedItem.value = newValue;
});
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        :class="buttonClass"
      >
        {{ displayValue }}
        <ChevronDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>

    <PopoverContent :class="popoverClass">
      <Command>
        <CommandInput
          :placeholder="searchPlaceholder"
          v-model="searchValue"
        />
        <CommandEmpty>{{ emptyStateText }}</CommandEmpty>
        <CommandList :class="listClass">
          <CommandGroup :heading="groupHeading">
            <CommandItem
              v-for="item in filteredItems"
              :key="item.id"
              :value="item.id"
              @select="selectItem(item)"
            >
              <Check
                :class="[
                  'mr-2 h-4 w-4',
                  selectedItem && selectedItem.id === item.id ? 'opacity-100' : 'opacity-0'
                ]"
              />
              {{ item.label }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
