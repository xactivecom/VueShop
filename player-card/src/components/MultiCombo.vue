<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-[400px] justify-between min-h-10"
      >
        <div class="flex flex-wrap gap-1 flex-1 text-left">
          <div
            v-if="selectedTeams.length === 0"
            class="text-muted-foreground"
          >
            Select teams...
          </div>
          <div
            v-else-if="selectedTeams.length <= 3"
            class="flex flex-wrap gap-1"
          >
            <Badge
              v-for="team in selectedTeams"
              :key="team.id"
              variant="secondary"
              class="text-xs"
            >
              {{ team.label }}
              <button
                @click.stop="toggleTeam(team)"
                class="ml-1 hover:text-red-500"
              >
                <X class="h-3 w-3" />
              </button>
            </Badge>
          </div>
          <div v-else class="text-sm">
            {{ selectedTeams.length }} teams selected
          </div>
        </div>
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    
    <PopoverContent class="w-[400px] p-0">
      <Command>
        <CommandInput
          class="h-9"
          placeholder="Search teams..."
          v-model="searchValue"
        />
        <CommandEmpty>No team found.</CommandEmpty>
        <CommandList class="max-h-60">
          <CommandGroup>
            <!-- Select All / Clear All options -->
            <!-- <CommandItem
              @select="selectAllTeams"
              class="cursor-pointer font-medium border-b"
            >
              <div class="flex items-center space-x-2">
                <div class="w-4 h-4 flex items-center justify-center">
                  <Check
                    v-if="selectedTeams.length === franchiseTeams.length"
                    class="h-4 w-4"
                  />
                  <Minus
                    v-else-if="selectedTeams.length > 0"
                    class="h-4 w-4"
                  />
                </div>
                <span>
                  {{ selectedTeams.length === franchiseTeams.length ? 'Clear All' : 'Select All' }}
                </span>
              </div>
            </CommandItem> -->
            
            <!-- Individual team options -->
            <CommandItem
              v-for="team in filteredTeams"
              :key="team.id"
              :value="team.id"
              @select="toggleTeam(team)"
              class="cursor-pointer"
            >
              <div class="flex items-center space-x-2 w-full">
                <!-- Checkbox indicator -->
                <div class="w-4 h-4 border border-gray-300 rounded flex items-center justify-center bg-white">
                  <Check
                    v-if="isTeamSelected(team)"
                    class="h-3 w-3 text-blue-600"
                  />
                </div>
                <span>{{ team.label }}</span>
              </div>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
      
      <!-- Footer with selection count -->
      <div class="p-2 border-t bg-gray-50 text-sm text-gray-600">
        {{ selectedTeams.length }} of {{ franchiseTeams.length }} teams selected
      </div>
    </PopoverContent>
  </Popover>

  <!-- Display selected teams -->
  <div v-if="selectedTeams.length > 0" class="space-y-2">
    <!-- <h3 class="text-lg font-medium">Selected Teams ({{ selectedTeams.length }}):</h3>
    <div class="grid grid-cols-2 gap-2">
      <div
        v-for="team in selectedTeams"
        :key="team.id"
        class="flex items-center justify-between p-2 bg-blue-50 rounded-md border"
      >
        <span class="text-sm">{{ team.label }}</span>
        <Button
          size="sm"
          variant="ghost"
          @click="toggleTeam(team)"
          class="h-6 w-6 p-0 hover:bg-red-100"
        >
          <X class="h-3 w-3" />
        </Button>
      </div>
    </div> -->
    
    <!-- Clear all button -->
    <Button
      variant="outline"
      @click="clearAllSelections"
      class="w-full mt-2"
    >
      Clear All Selections
    </Button>
  </div>

  <!-- Selected team IDs for debugging/API calls -->
  <div v-if="selectedTeams.length > 0" class="mt-4 p-4 bg-gray-50 rounded-md">
    <p class="text-sm font-medium">Selected Team IDs:</p>
    <p class="text-sm font-mono">{{ selectedTeamIds }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Check, ChevronsUpDown, X, Minus } from 'lucide-vue-next'

// Type definition for team
interface FranchiseTeam {
  id: string
  label: string
}

// Franchise teams data
const franchiseTeams: FranchiseTeam[] = [
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
const open = ref(false)
const searchValue = ref('')
const selectedTeams = ref<FranchiseTeam[]>([])

// Computed properties
const filteredTeams = computed(() => {
  if (!searchValue.value) {
    return franchiseTeams
  }
  
  return franchiseTeams.filter(team =>
    team.label.toLowerCase().includes(searchValue.value.toLowerCase())
  )
})

const selectedTeamIds = computed(() => {
  return selectedTeams.value.map(team => team.id)
})

// Helper functions
const isTeamSelected = (team: FranchiseTeam): boolean => {
  return selectedTeams.value.some(selected => selected.id === team.id)
}

const toggleTeam = (team: FranchiseTeam) => {
  const index = selectedTeams.value.findIndex(selected => selected.id === team.id)
  
  if (index >= 0) {
    // Remove team if already selected
    selectedTeams.value.splice(index, 1)
  } else {
    // Add team if not selected
    selectedTeams.value.push(team)
  }
  
  console.log('Selected teams:', selectedTeams.value)
}

const selectAllTeams = () => {
  if (selectedTeams.value.length === franchiseTeams.length) {
    // Clear all if all are selected
    clearAllSelections()
  } else {
    // Select all teams
    selectedTeams.value = [...franchiseTeams]
  }
}

const clearAllSelections = () => {
  selectedTeams.value = []
}

// Set default selection on mount (first team)
onMounted(() => {
  // if (franchiseTeams.length > 0) {
  //   selectedTeams.value = [franchiseTeams[0]] // First team as default
  // }
})

// Optional: Emit events for parent component
// const emit = defineEmits<{
//   selectionChange: [teams: FranchiseTeam[]]
// }>()

// watch(selectedTeams, (newTeams) => {
//   emit('selectionChange', newTeams)
// }, { deep: true })
</script>