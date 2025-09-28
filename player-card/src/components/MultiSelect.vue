<script setup lang="ts" generic="T">
import { ref, computed, watch } from "vue";
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  // CommandLabel,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown, X, Minus } from "lucide-vue-next";

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

  maxBadges?: number;
  showSelectAll?: boolean;
  showFooter?: boolean;
  showSelectedItems?: boolean;
  selectedItemsLabel?: string;
  selectedCountText?: string;

  footerText?: string;
  selectAllText?: string;
  clearAllText?: string;
  valueKey: keyof T;
  labelKey: keyof T;

  modelValue?: T[];
}

// Define propeties with defaults
// listClass: height 36px + (5 items * 44px)
const props = withDefaults(defineProps<Props<T>>(), {
  placeholder: "Select item...",
  searchPlaceholder: "Search items...",
  emptyStateText: "No items found.",
  groupHeading: "Items",
  buttonClass: "w-[300px] justify-between",
  popoverClass: "w-[300px] p-0",
  listClass: "max-h-[256px] overflow-y-auto",

  maxBadges: 3,
  showSelectAll: true,
  showFooter: true,
  showSelectedItems: false,
  selectedItemsLabel: 'Selected Items',
  selectedCountText: 'items selected',

  footerText: 'items',
  selectAllText: 'Select All',
  clearAllText: 'Clear All',

  modelValue: () => [] as T[],
});

// Define emits
const emit = defineEmits<{
  'update:modelValue': [value: T[]]
  'select': [item: T, selected: boolean]
  'selectAll': [items: T[]]
  'clearAll': []
}>();

// Reactive state
const open = ref(false)
const searchValue = ref('')
const selectedItems = ref<T[]>([...props.modelValue])
const selectAllValue = '__select_all__'

// Computed properties
const filteredItems = computed(() => {
  if (!searchValue.value) return props.items
  
  return props.items.filter(item =>
    getItemLabel(item)
      .toLowerCase()
      .includes(searchValue.value.toLowerCase())
  )
});

// Helper functions
const getItemValue = (item: T): string => {
  const value = item[props.valueKey]
  return typeof value === 'string' ? value : String(value)
};

const getItemLabel = (item: T): string => {
  const label = item[props.labelKey]
  return typeof label === 'string' ? label : String(label)
};

const isItemSelected = (item: T): boolean => {
  return selectedItems.value.some(selected => 
    getItemValue(selected) === getItemValue(item)
  );
};

const toggleItem = (item: T) => {
  const index = selectedItems.value.findIndex(selected => 
    getItemValue(selected) === getItemValue(item)
  );
  
  if (index >= 0) {
    // Remove item
    selectedItems.value.splice(index, 1);
    emit('select', item, false);
  } else {
    // Add item
    selectedItems.value.push(item);
    emit('select', item, true);
  }
  
  emit('update:modelValue', [...selectedItems.value]);
};

const selectAllItems = () => {
  selectedItems.value = [...props.items];
  emit('update:modelValue', [...selectedItems.value]);
  emit('selectAll', [...selectedItems.value]);
};

const clearAllSelections = () => {
  selectedItems.value = [];
  emit('update:modelValue', []);
  emit('clearAll');
};

const toggleSelectAll = () => {
  if (selectedItems.value.length === filteredItems.value.length && filteredItems.value.length > 0) {
    // Clear filtered items
    const filteredValues = filteredItems.value.map(item => getItemValue(item));
    selectedItems.value = selectedItems.value.filter(selected =>
      !filteredValues.includes(getItemValue(selected))
    );
  } else {
    // Add all filtered items
    filteredItems.value.forEach(item => {
      if (!isItemSelected(item)) {
        selectedItems.value.push(item);
      }
    });
  }
  
  emit('update:modelValue', [...selectedItems.value]);
};

const getSelectAllText = (): string => {
  if (selectedItems.value.length === 0) {
    return props.selectAllText;
  } else if (selectedItems.value.length === props.items.length) {
    return props.clearAllText;
  } else {
    return `${selectedItems.value.length}/${props.items.length} selected`;
  }
};
// Watch for external modelValue changes
watch(() => props.modelValue, (newValue) => {
  selectedItems.value = [...newValue]
}, { deep: true });

// Prevent dropdown from closing on selection
const handleSelectInteraction = () => {
  // Keep dropdown open for multi-select
}
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
            <Badge
              v-for="item in selectedItems"
              :key="getItemValue(item)"
              variant="secondary"
              class="text-xs"
            >
              {{ getItemLabel(item) }}
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
    
    <PopoverContent :class="popoverClass">
      <Command>
        <CommandInput
          :placeholder="searchPlaceholder"
          v-model="searchValue"
        />
        <CommandEmpty>{{ emptyStateText }}</CommandEmpty>
        <CommandList :class="listClass">
          <CommandGroup>
            <!-- Select All / Clear All option -->
            <CommandItem
              v-if="showSelectAll"
              :value="selectAllValue"
              class="cursor-pointer font-medium border-b mb-1"
              @select="toggleSelectAll"
            >
              <div class="flex items-center space-x-2 w-full">
                <div class="w-4 h-4 border border-gray-300 rounded flex items-center justify-center bg-white">
                  <Check
                    v-if="selectedItems.length === filteredItems.length && filteredItems.length > 0"
                    class="h-3 w-3 text-blue-600"
                  />
                  <Minus
                    v-else-if="selectedItems.length > 0"
                    class="h-3 w-3 text-blue-600"
                  />
                </div>
                <span>{{ getSelectAllText() }}</span>
              </div>
            </CommandItem>
            
            <!-- <CommandLabel v-if="groupHeading">{{ groupHeading }}</CommandLabel> -->
            
            <!-- Individual items -->
            <CommandItem
              v-for="item in filteredItems"
              :key="getItemValue(item)"
              :value="getItemValue(item)"
              @select="toggleItem(item)"
              class="cursor-pointer"
            >
              <div class="flex items-center space-x-2 w-full">
                <!-- Checkbox indicator -->
                <div class="w-4 h-4 border border-gray-300 rounded flex items-center justify-center bg-white">
                  <Check
                    v-if="isItemSelected(item)"
                    class="h-3 w-3 text-blue-600"
                  />
                </div>
                <span>{{ getItemLabel(item) }}</span>
              </div>
            </CommandItem>
          </CommandGroup>
        </CommandList>
        
        <!-- Footer with selection count -->
        <div v-if="showFooter" class="p-2 border-t bg-gray-50 text-sm text-gray-600">
          {{ selectedItems.length }} of {{ props.items.length }} {{ footerText }}
        </div>
      </Command>
    </PopoverContent>
  </Popover>

</template>
