<script setup lang="ts" generic="T extends Record<string, any>">
import { ref, type Ref, computed } from "vue";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, X } from "lucide-vue-next";

// Property item configuation
export interface ColumnConfig<T> {
  id: keyof T;
  label: string;
  width?: number; // Column width in grid units (1-12)
  format?: (value: any) => string;
}

// Properties interface
interface Props<T> {
  id?: string;
  items: T[];
  columns: ColumnConfig<T>[];
  valueKey: keyof T;

  placeholder?: string;
  listClass?: string;
}

// Define propeties with defaults
// listClass: height 36px + (5 items * 44px)
const props = withDefaults(defineProps<Props<T>>(), {
  placeholder: "Select item...",
  popoverClass: "w-full p-0",
  listClass: "max-h-[256px] overflow-y-auto", // approx 5 items

  modelValue: () => [],
});







// Define emits
// const emit = defineEmits<{
//   "update:modelValue": [value: T[]]
//   "select": [item: T, selected: boolean]
// }>();

// Reactive state
// const isOpen = ref(false);
// const searchTerm = ref("");
// const selectedItems = ref<T[]>([...props.modelValue]) as Ref<T[]>;

</script>


<template>

</template>
