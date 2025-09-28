<template>
  <div class="flex flex-col space-y-4 p-6">
    <h2 class="text-2xl font-semibold">Select Multiple Franchise Teams</h2>
    
    <div class="w-[400px]">
      <Select v-model="selectTriggerValue" @update:model-value="handleSelectInteraction">
        <SelectTrigger class="min-h-10">
          <SelectValue>
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
          </SelectValue>
        </SelectTrigger>
        
        <SelectContent class="w-[400px]">
          <SelectGroup>
            <SelectLabel>NHL Franchise Teams</SelectLabel>
            
            <!-- Select All / Clear All option -->
            <SelectItem
              value="__select_all__"
              class="cursor-pointer font-medium border-b"
              @click="toggleSelectAll"
            >
              <div class="flex items-center space-x-2">
                <div class="w-4 h-4 border border-gray-300 rounded flex items-center justify-center bg-white">
                  <Check
                    v-if="selectedTeams.length === franchiseTeams.length"
                    class="h-3 w-3 text-blue-600"
                  />
                  <Minus
                    v-else-if="selectedTeams.length > 0"
                    class="h-3 w-3 text-blue-600"
                  />
                </div>
                <span>
                  {{ selectedTeams.length === franchiseTeams.length ? 'Clear All' : 'Select All' }}
                </span>
              </div>
            </SelectItem>
            
            <!-- Individual team options -->
            <SelectItem
              v-for="team in franchiseTeams"
              :key="team.id"
              :value="team.id"
              class="cursor-pointer"
              @click="toggleTeam(team)"
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
            </SelectItem>
          </SelectGroup>
          
          <!-- Footer with selection count -->
          <div class="p-2 border-t bg-gray-50 text-sm text-gray-600">
            {{ selectedTeams.length }} of {{ franchiseTeams.length }} teams selected
          </div>
        </SelectContent>
      </Select>
    </div>

    <!-- Enhanced Multi-Select with Grouping -->
    <div class="mt-8">
      <h3 class="text-lg font-medium mb-2">Grouped Multi-Select</h3>
      <div class="w-[450px]">
        <Select v-model="selectTriggerValue" @update:model-value="handleSelectInteraction">
          <SelectTrigger class="min-h-12">
            <SelectValue>
              <div class="flex flex-wrap gap-1 flex-1 text-left">
                <div
                  v-if="selectedTeams.length === 0"
                  class="text-muted-foreground"
                >
                  Choose your favorite NHL teams...
                </div>
                <div
                  v-else-if="selectedTeams.length <= 4"
                  class="flex flex-wrap gap-1"
                >
                  <Badge
                    v-for="team in selectedTeams"
                    :key="team.id"
                    :variant="team.id === 'all' ? 'default' : 'secondary'"
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
                <div v-else class="text-sm font-medium text-blue-600">
                  {{ selectedTeams.length }} teams selected
                </div>
              </div>
            </SelectValue>
          </SelectTrigger>
          
          <SelectContent class="w-[450px] max-h-80">
            <!-- Special Options -->
            <SelectGroup>
              <SelectLabel>Options</SelectLabel>
              <SelectItem
                value="all"
                class="cursor-pointer"
                @click="toggleTeam(franchiseTeams[0])"
              >
                <div class="flex items-center space-x-2 w-full">
                  <div class="w-4 h-4 border border-gray-300 rounded flex items-center justify-center bg-white">
                    <Check
                      v-if="isTeamSelected(franchiseTeams[0])"
                      class="h-3 w-3 text-blue-600"
                    />
                  </div>
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 rounded-full bg-gray-400"></div>
                    <span>{{ franchiseTeams[0].label }}</span>
                  </div>
                </div>
              </SelectItem>
            </SelectGroup>
            
            <SelectSeparator />
            
            <!-- Eastern Conference -->
            <SelectGroup>
              <SelectLabel class="flex items-center justify-between">
                <span>Eastern Conference</span>
                <Button
                  size="sm"
                  variant="ghost"
                  class="h-5 text-xs"
                  @click="toggleConference('eastern')"
                >
                  {{ getConferenceSelectionText('eastern') }}
                </Button>
              </SelectLabel>
              <SelectItem
                v-for="team in easternTeams"
                :key="team.id"
                :value="team.id"
                class="cursor-pointer"
                @click="toggleTeam(team)"
              >
                <div class="flex items-center space-x-2 w-full">
                  <div class="w-4 h-4 border border-gray-300 rounded flex items-center justify-center bg-white">
                    <Check
                      v-if="isTeamSelected(team)"
                      class="h-3 w-3 text-blue-600"
                    />
                  </div>
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>{{ team.label }}</span>
                  </div>
                </div>
              </SelectItem>
            </SelectGroup>
            
            <SelectSeparator />
            
            <!-- Western Conference -->
            <SelectGroup>
              <SelectLabel class="flex items-center justify-between">
                <span>Western Conference</span>
                <Button
                  size="sm"
                  variant="ghost"
                  class="h-5 text-xs"
                  @click="toggleConference('western')"
                >
                  {{ getConferenceSelectionText('western') }}
                </Button>
              </SelectLabel>
              <SelectItem
                v-for="team in westernTeams"
                :key="team.id"
                :value="team.id"
                class="cursor-pointer"
                @click="toggleTeam(team)"
              >
                <div class="flex items-center space-x-2 w-full">
                  <div class="w-4 h-4 border border-gray-300 rounded flex items-center justify-center bg-white">
                    <Check
                      v-if="isTeamSelected(team)"
                      class="h-3 w-3 text-blue-600"
                    />
                  </div>
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span>{{ team.label }}</span>
                  </div>
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>

    <!-- Display selected teams -->
    <div v-if="selectedTeams.length > 0" class="space-y-2">
      <h3 class="text-lg font-medium">Selected Teams ({{ selectedTeams.length }}):</h3>
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
      </div>
      
      <!-- Action buttons -->
      <div class="flex space-x-2">
        <Button
          variant="outline"
          @click="clearAllSelections"
          class="flex-1"
        >
          Clear All
        </Button>
        <Button
          @click="selectAllTeams"
          class="flex-1"
        >
          Select All
        </Button>
      </div>
    </div>

    <!-- Selected team IDs for API calls -->
    <div v-if="selectedTeams.length > 0" class="mt-4 p-4 bg-gray-50 rounded-md">
      <p class="text-sm font-medium">Selected Team IDs:</p>
      <p class="text-sm font-mono break-all">{{ selectedTeamIds }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Check, X, Minus } from 'lucide-vue-next'

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

// Conference groupings
const easternTeams = computed(() => 
  franchiseTeams.filter(team => 
    ['bos', 'buf', 'car', 'det'].includes(team.id)
  )
)

const westernTeams = computed(() => 
  franchiseTeams.filter(team => 
    ['ana', 'cal', 'chi', 'cor', 'col', 'das', 'edm'].includes(team.id)
  )
)

// Reactive state
const selectedTeams = ref<FranchiseTeam[]>([])
const selectTriggerValue = ref<string>('')

// Computed properties
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
  selectedTeams.value = [...franchiseTeams]
}

const clearAllSelections = () => {
  selectedTeams.value = []
}

const toggleSelectAll = () => {
  if (selectedTeams.value.length === franchiseTeams.length) {
    clearAllSelections()
  } else {
    selectAllTeams()
  }
}

const toggleConference = (conference: 'eastern' | 'western') => {
  const teams = conference === 'eastern' ? easternTeams.value : westernTeams.value
  const allSelected = teams.every(team => isTeamSelected(team))
  
  if (allSelected) {
    // Remove all teams from this conference
    teams.forEach(team => {
      const index = selectedTeams.value.findIndex(selected => selected.id === team.id)
      if (index >= 0) {
        selectedTeams.value.splice(index, 1)
      }
    })
  } else {
    // Add all teams from this conference
    teams.forEach(team => {
      if (!isTeamSelected(team)) {
        selectedTeams.value.push(team)
      }
    })
  }
}

const getConferenceSelectionText = (conference: 'eastern' | 'western'): string => {
  const teams = conference === 'eastern' ? easternTeams.value : westernTeams.value
  const selectedCount = teams.filter(team => isTeamSelected(team)).length
  
  if (selectedCount === 0) {
    return 'Select All'
  } else if (selectedCount === teams.length) {
    return 'Clear All'
  } else {
    return `${selectedCount}/${teams.length}`
  }
}

// Handle select interactions (prevents dropdown from closing)
const handleSelectInteraction = (value: string) => {
  // Reset the trigger value to prevent single selection behavior
  selectTriggerValue.value = ''
}

// Set default selection on mount
onMounted(() => {
  // if (franchiseTeams.length > 0) {
  //   selectedTeams.value = [franchiseTeams[0]] // First team as default
  // }
})

// Optional: Define emits for parent component communication
// const emit = defineEmits<{
//   selectionChange: [teams: FranchiseTeam[]]
// }>()

// watch(selectedTeams, (newTeams) => {
//   emit('selectionChange', newTeams)
// }, { deep: true })
</script>