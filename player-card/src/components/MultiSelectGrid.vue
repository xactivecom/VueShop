<script setup lang="ts" generic="T extends Record<string, any>">
import { ref, type Ref, computed } from "vue";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Check, ChevronDown, X } from "lucide-vue-next";

// Property item configuation
export interface MultiColumnConfig<T> {
  id: keyof T;
  label: string;
  width?: number; // Column width in grid units (1-12)
  format?: (value: any) => string;
}

// Properties interface
interface Props<T> {
  id?: string;
  items: T[];
  columns: MultiColumnConfig<T>[];
  valueKey: keyof T;
  labelKey: keyof T;
  badgeKey?: keyof T;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyStateText?: string;
  buttonClass?: string;
  popoverClass?: string;
  listClass?: string;
  maxBadges?: number;
  showFooter?: boolean;
  selectedCountText?: string;
  footerText?: string;
  modelValue?: T[];
}

// Define propeties with defaults
const props = withDefaults(defineProps<Props<T>>(), {
  placeholder: "Search and select items ...",
  searchPlaceholder: "Search...",
  emptyStateText: "No items found.",
  buttonClass: "w-full justify-between",
  popoverClass: "w-full p-0",
  listClass: "max-h-[256px] overflow-auto p-0", // approx 5 items
  maxBadges: 2,
  showFooter: true,
  selectedCountText: "items selected",
  footerText: "items",
  modelValue: () => [],
});

// Define emits
const emit = defineEmits<{
  "update:modelValue": [value: T[]]
  "select": [item: T, selected: boolean]
}>();

// Reactive state
const isOpen = ref(false);
const searchTerm = ref("");
const selectedItems = ref<T[]>([...props.modelValue]) as Ref<T[]>;

// Computed properties
const filteredItems = computed(() => {
  if (!searchTerm.value) return props.items;

  // Filter on searchTerm appearing in any column
  const query = searchTerm.value.toLowerCase();
  return props.items.filter(item =>
    props.columns.some(col => {
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

const getItemBadge = (item: T): string => {
  const label = item[props?.badgeKey ? props?.badgeKey : props.labelKey];
  return typeof label === "string" ? label : String(label);
};

const isItemSelected = (item: T): boolean => {
  return selectedItems.value.some(selected => 
    getItemValue(selected) === getItemValue(item)
  );
};

const toggleItem = (item: T) => {
  const itemValue = getItemValue(item);
  const isCurrentlySelected = isItemSelected(item);

  if (isCurrentlySelected) {
    // Remove item - standard behavior
    const index = selectedItems.value.findIndex(selected => 
      getItemValue(selected) === itemValue
    );
    if (index >= 0) {
      selectedItems.value.splice(index, 1);
    }
    emit("select", item, false);
  } else {
    // Add the new item
    selectedItems.value.push(item);
    emit("select", item, true);    
  }
  emit("update:modelValue", [...selectedItems.value]);
};

const getColumnClass = (width?: number) => {
  // Return complete class names that Tailwind can detect during layout.
  // Note: the Tailwind JIT compiler must see a static class name; it
  // cannot recognize a dynamic class name.
  const w = width || 1;
  const classMap: Record<number, string> = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    8: 'col-span-8',
    9: 'col-span-9',
    10: 'col-span-10',
    11: 'col-span-11',
    12: 'col-span-12'
  }
  return classMap[w] || 'col-span-1';
};

const formatValue = (item: T, column: MultiColumnConfig<T>) => {
  const value = item[column.id];
  return column.format ? column.format(value) : value?.toString() || "";
};

const openPopover = () => {
  // Clear previous search value
  searchTerm.value = "";
};
</script>

<template>
  <Popover v-model:open="isOpen" @update:open="openPopover">
    <PopoverTrigger as-child>
      <Button
        :id="id"
        variant="outline"
        role="combobox"
        :aria-expanded="isOpen"
        :class="buttonClass"
      >
        <div class="flex flex-wrap gap-1 flex-1 text-left min-h-5">
          <div
            v-if="selectedItems.length === 0"
            class="text-muted-foreground"
          >
            {{ placeholder }}
          </div>
          <div
            v-else-if="selectedItems.length <= maxBadges"
            class="flex flex-wrap gap-1"
          >
            <!-- Each label is wrapped by a badge -->
            <Badge
              v-for="item in selectedItems"
              :key="getItemValue(item)"
              variant="secondary"
              class="text-xs"
            >
              {{ getItemBadge(item) }}
              <button
                @click.stop="toggleItem(item)"
                class="ml-1 hover:text-red-500"
              >
                <X class="h-3 w-3" />
              </button>
            </Badge>
          </div>
          <div v-else class="text-sm font-medium">
            {{ selectedItems.length }} {{ selectedCountText }}
          </div>
        </div>
        <ChevronDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>

    <PopoverContent :class="popoverClass" align="start">
      <Command>
        <CommandInput
          :placeholder="searchPlaceholder"
          v-model="searchTerm"
        />
        <CommandEmpty>{{ emptyStateText }}</CommandEmpty>

        <CommandList>
          <!-- Note: sticky header requires height/overflow styles on CommandGroup -->
          <CommandGroup :class="listClass">
            <!-- Grid header -->
            <div class="sticky top-0 w-full bg-background border-b grid grid-cols-12 px-2 pt-3 pb-2 font-semibold text-sm z-2">
              <div class="col-span-1"></div>
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
              @select="toggleItem(item)"
              class="grid grid-cols-12 gap-2 px-2 py-3 cursor-pointer"
            >
              <!-- Checkbox indicator -->
              <div class="col-span-1 w-4 h-4 border border-gray-300 rounded bg-white">
                <Check
                  v-if="isItemSelected(item)"
                  class="h-3 w-3 text-blue-600"
                />
              </div>
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

        <!-- Footer with selection count -->
        <footer v-if="showFooter" class="p-2 border-t bg-gray-50 text-sm text-gray-600">
          {{ selectedItems.length }} of {{ props.items.length }} {{ footerText }}
        </footer>
      </Command>
    </PopoverContent>
  </Popover>

</template>
