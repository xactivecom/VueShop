<script setup lang="ts" generic="T">
import { ref, computed, watch } from "vue";
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

// Properties interface
interface Props<T> {
  items: T[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyStateText?: string;
  groupHeading?: string;
  buttonClass?: string;
  popoverClass?: string;
  listClass?: string;
  valueKey: keyof T;
  labelKey: keyof T;
  modelValue?: T | null;
}

// Define propeties with defaults
// listClass: height 36px + (5 items * 44px)
const props = withDefaults(defineProps<Props<T>>(), {
  placeholder: "Select item...",
  searchPlaceholder: "Search items...",
  emptyStateText: "No items found.",
  groupHeading: "Items",
  buttonClass: "w-full justify-between",
  popoverClass: "w-full p-0",
  listClass: "max-h-[256px] overflow-y-auto",  // approx 5 rows
  modelValue: null,
});

// Define emits
const emit = defineEmits<{
  "update:modelValue": [value: T | null];
  "select": [item: T];
}>();

// Reactive state
const open = ref(false);
const searchValue = ref("");
const selectedItem = ref<T | null | undefined>(props.modelValue);

// Computed properties
const displayValue = computed(() => {
  return selectedItem.value 
    ? selectedItem.value.label 
    : props.placeholder;
});

const filteredItems = computed((): T[] => {
  if (!searchValue.value) return props.items;
  
  // Filter on searchValue appearing in item label
  const query = searchValue.value.toLowerCase();
  return props.items.filter(item =>
    getItemLabel(item)
      .toLowerCase()
      .includes(query)
  );
});

// Helper functions
const getItemValue = (item: T): string => {
  const value = item[props.valueKey];
  return typeof value === 'string' ? value : String(value);
};

const getItemLabel = (item: T): string => {
  const label = item[props.labelKey];
  return typeof label === 'string' ? label : String(label);
};

const selectItem = (item: T) => {
  selectedItem.value = item;
  open.value = false;
  searchValue.value = "";
  
  // Emit events
  emit("update:modelValue", item);
  emit("select", item);
};

// Watch for external modelValue changes
watch(() => props.modelValue, (newValue) => {
  selectedItem.value = newValue;
});
</script>

<template>
  <Popover v-model:open="open" align="start">
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
              :key="getItemValue(item)"
              :value="getItemValue(item)"
              @select="selectItem(item)"
            >
              <Check
                :class="[
                  'mr-2 h-4 w-4',
                  selectedItem && getItemValue(selectedItem as T) === getItemValue(item) ? 'opacity-100' : 'opacity-0'
                ]"
              />
              {{ getItemLabel(item) }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
