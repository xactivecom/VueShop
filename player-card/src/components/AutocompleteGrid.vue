<script setup lang="ts" generic="T extends Record<string, any>">
import { ref, computed } from "vue";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, X } from "lucide-vue-next";

// Property item configuation
export interface AutoColumnConfig<T> {
  id: keyof T;
  label: string;
  width?: number; // Column width in grid units (1-12)
  format?: (value: any) => string;
  isSearchable?: boolean; // Searchable column
}

// Properties interface
interface Props<T> {
  id?: string;
  items: T[];
  columns: AutoColumnConfig<T>[];
  minSearchLength?: number;
  valueKey: keyof T;
  labelKey: keyof T;
  placeholder?: string;
  buttonClass?: string; // ?
  popoverClass?: string;
  listClass?: string;
  modelValue?: T | null;
}

// Define propeties with defaults
const props = withDefaults(defineProps<Props<T>>(), {
  minSearchLength: 3,
  placeholder: "Select item...",
  buttonClass: "w-full justify-between", // ?
  popoverClass: "w-full p-0",
  listClass: "max-h-[256px] overflow-auto p-0", // approx 5 items
  modelValue: null,
});

// Define emits
const emit = defineEmits<{
  "update:modelValue": [value: T | null];
  "select": [item: T];
}>();

// Reactive state
const isOpen = ref(false);
const searchTerm = ref("");
const selectedItem = ref<T | null | undefined>(props.modelValue);

// Computed properties
const isMinLength = computed((): boolean => {
  return searchTerm.value.length >= props.minSearchLength;
});

const filteredItems = computed((): T[] => {
  // Ignore search until significant
  if (searchTerm.value.length < props.minSearchLength) return [];

  // Filter on searchTerm appearing in searchable subset
  const query = searchTerm.value.toLowerCase();
  return props.items.filter(item =>
    props.columns
      .filter(col => col.isSearchable)
      .some(col => {
        const value = item[col.id];
        return value?.toString().toLowerCase().includes(query);
      })
  );
});

// Helper functions
const getItemValue = (item: T): string => {
  const value = item[props.valueKey];
  return typeof value === "string" ? value : String(value);
};

const handleSearch = (value: string) => {
  searchTerm.value = value;
  isOpen.value = value.length >= props.minSearchLength && filteredItems.value.length > 0;
};

const handleSelect = (item: T) => {
  selectedItem.value = item;
  searchTerm.value = item[props.labelKey];
  isOpen.value = false;
  emit("select", item);
};

const handleClear = () => {
  searchTerm.value = "";
  selectedItem.value = null;
  isOpen.value = false;
};

const getColumnClass = (width?: number) => {
  // Return complete class names that Tailwind can detect during layout.
  // Note: the Tailwind JIT compiler must see a static class name; it
  // cannot recognize a dynamic class name.
  const w = width || 1;
  const classMap: Record<number, string> = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
    7: "col-span-7",
    8: "col-span-8",
    9: "col-span-9",
    10: "col-span-10",
    11: "col-span-11",
    12: "col-span-12"
  };
  return classMap[w] || "col-span-1";
};

const formatValue = (item: T, column: AutoColumnConfig<T>) => {
  const value = item[column.id];
  return column.format ? column.format(value) : value?.toString() || "";
};
</script>

<template>
  <Popover v-model:open="isOpen">
    <PopoverTrigger as-child>
      <div class="relative">
        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        <Input
          id="id"
          v-model="searchTerm"
          type="text"
          class="w-full pl-10 pr-10 bg-white"
          :placeholder="placeholder"
          @input="handleSearch(searchTerm)" />
        <button 
          v-if="searchTerm"
          @click="handleClear"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 bg-white"
        >
          <X class="w-5 h-5" />
        </button>
      </div>
    </PopoverTrigger>

    <PopoverContent v-if="isMinLength" :class="popoverClass" align="start">
      <Command>
        <CommandList>
          <!-- Note: sticky header requires height/overflow styles on CommandGroup -->
          <CommandGroup :class="listClass">
            <!-- Grid header -->
            <div class="sticky top-0 w-full bg-background border-b grid grid-cols-12 px-2 pt-3 pb-2 font-semibold text-sm z-2">
              <div
                v-for="column in columns"
                :key="String(column.id)"
                :class="getColumnClass(column.width)"
              >
                {{ column.label }}
              </div>
            </div>

            <!-- Grid rows -->
            <CommandItem
              v-for="item in filteredItems"
              :key="getItemValue(item)"
              :value="getItemValue(item)"
              @select="handleSelect(item)"
              class="grid grid-cols-12 gap-2 px-2 py-3 cursor-pointer hover:bg-blue-50"
            >
              <div
                v-for="column in columns"
                :key="String(column.id)"
                :class="getColumnClass(column.width)"
              >
                {{ formatValue(item, column) }}
              </div>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>

</template>
