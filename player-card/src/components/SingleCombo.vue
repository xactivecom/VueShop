<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronDown } from 'lucide-vue-next';

// Definition for select item
export interface SelectItem {
  id: string
  label: string
}

// Franchise teams data
const franchiseTeams: SelectItem[] = [
  { id: "all", label: "All Franchises" },
  { id: "ana", label: "Anaheim Ducks" },
  { id: "bos", label: "Boston Bruins" },
  { id: "buf", label: "Buffalo Sabres" },
  { id: "cal", label: "Calgary Flames" },
  { id: "car", label: "Carolina Hurricanes" },
  { id: "chi", label: "Chicago Blackhawks" },
  { id: "cor", label: "Colorado Avalanche" },
  { id: "col", label: "Columbus Blue Jackets" },
  { id: "das", label: "Dallas Stars" },
  { id: "det", label: "Detroit Red Wings" },
  { id: "edm", label: "Edmonton Oilers" },
]

// Reactive state
const open = ref(false);
const searchValue = ref('');
const selectedTeam = ref<SelectItem | null | undefined>(null);

// Computed property for filtered items based on search
const filteredItems = computed(() => {
  if (!searchValue.value) return franchiseTeams;
  
  return franchiseTeams.filter(item =>
    item.label.toLowerCase().includes(searchValue.value.toLowerCase())
  );
});

// Function to select a team
const selectTeam = (team: SelectItem) => {
  selectedTeam.value = team
  open.value = false
  searchValue.value = ''
}

// Set default selection on mount
onMounted(() => {
  if (franchiseTeams.length > 0) {
    selectedTeam.value = franchiseTeams[0] // First team as default
  }
})

// Optional: Watch for changes to selectedTeam
// watch(selectedTeam, (newTeam) => {
//   console.log('Team changed to:', newTeam)
//   // You can emit events or perform other actions here
// })
</script>


<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-[300px] justify-between"
      >
        {{ selectedTeam ? selectedTeam.label : "Select team..." }}
        <ChevronDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    
    <PopoverContent class="w-[300px] p-0">
      <Command>
        <CommandInput
          class="h-9"
          placeholder="Search teams..."
          v-model="searchValue"
        />
        <CommandEmpty>No team found.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="team in filteredItems"
              :key="team.id"
              :value="team.id"
              @select="selectTeam(team)"
              class="cursor-pointer"
            >
              {{ team.label }}
              <Check
                v-if="selectedTeam?.id === team.id"
                class="ml-auto h-4 w-4"
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>

  <!-- Display selected team info -->
  <div v-if="selectedTeam" class="mt-4 p-4 bg-gray-50 rounded-md">
    <p class="text-sm font-medium">Selected Team:</p>
    <p class="text-lg">{{ selectedTeam.label }}</p>
    <p class="text-sm text-gray-600">ID: {{ selectedTeam.id }}</p>
  </div>
</template>
