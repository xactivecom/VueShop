<script setup lang="ts">
import { ref } from "vue";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

// import { Search } from "lucide-vue-next"; // Search icon

import SingleSelect, { type SingleSelectItem } from "@/components/SingleSelect.vue";
// import MultiSelect from "@/components/MultiSelect.vue";
// import SingleCombo from "@/components/SingleCombo.vue";
// import MultiCombo from "@/components/MultiCombo.vue";

// Search model for activeOnly checkbox
const isActiveOnly = ref(true);

// Report type selections
const reportTypes: SingleSelectItem[] = [
  { id: "summary", label: "Summary" },
  { id: "bio", label: "Bio Info" },
  { id: "faceoff", label: "Face-off" },
  { id: "goals", label: "Goals" },
  { id: "penalties", label: "Penalties" },
];

// Reactive state
const selectedReportType = ref<SingleSelectItem | null | undefined>(null);

// Event handlers
const onReportSelect = (report: SingleSelectItem) => {
  console.log('Report selected:', report);
}

// Game type selections
const gameTypes = [
  { id: "regular", label: "Regular Season" },
  { id: "playoff", label: "Playoffs" },
  { id: "combined", label: "Combined" },
];

// Team selections
const franchiseTeams: SingleSelectItem[] = [
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
];

// Reactive state
const selectedTeam = ref<SingleSelectItem | null | undefined>(null);

// Event handlers
const onTeamSelect = (team: SingleSelectItem) => {
  console.log('Team selected:', team);
}

// Set default selections
import { onMounted } from 'vue';
onMounted(() => {
  // Default to the "All" team
  selectedTeam.value = franchiseTeams[0];
});
</script>


<template>
  <!-- Header -->
  <div class="h-8 mb-4 bg-blue-500"></div>

  <div class="m-2">
    <h1 class="text-2xl text-gray-800">Portal Blocks Demo</h1>
    
    <!-- Text input field, label -->
    <!-- <div class="my-4 border border-solid border-gray-200 rounded-md bg-white">
      <span class="p-2 pt-4 text-xs text-blue-500">Text input field. Verical aligned label.</span>
      <div class="p-2 grid w-full max-w-sm items-center gap-1.5">
        <Label for="playerName">Player Name</Label>
        <Input id="playerName" type="text" placeholder="Enter name" />
      </div>
    </div> -->

    <!-- Search input field, label -->
    <!-- <div class="my-4 border border-solid border-gray-200 rounded-md bg-white">
      <span class="p-2 pt-4 text-xs text-blue-500">Search input field with icon. Verical aligned label.</span>
      <div class="p-2 grid w-full max-w-sm items-center gap-1.5">
        <Label for="searchName">Search Name</Label>
        <div class="relative w-full max-w-sm items-center">
          <Input id="searchName" type="text" class="pl-10" placeholder="Search..." />
          <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
            <Search class="size-6 text-muted-foreground" />
          </span>
        </div>
      </div>
    </div> -->

    <!-- Search input field, label, checkbox -->
    <!-- <div class="my-4 border border-solid border-gray-200 rounded-md bg-white">
      <span class="p-2 pt-4 text-xs text-blue-500">Search input field with icon. Verical aligned label.
        Horizontally aligned checkbox.
      </span>
      <div class="p-2 grid w-full max-w-sm items-center gap-1.5">
        <Label for="searchName">Search Name</Label>
        <div class="flex gap-6">
          <div class="relative w-full max-w-sm items-center">
            <Input id="searchName" type="text" class="pl-10" placeholder="Search..." />
            <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
              <Search class="size-6 text-muted-foreground" />
            </span>
          </div>
          <div class="flex items-center space-x-2">
            <Checkbox id="activeOnly" v-model="isActiveOnly" />
            <Label for="activeOnly" class="text-sm text-nowrap font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Active only</Label>
          </div>
        </div>
      </div>
    </div> -->

    <!-- Single selection field, limited to 5 rows, label -->
    <div class="my-4 border border-solid border-gray-200 rounded-md bg-white">
      <span class="p-2 pt-4 text-xs text-blue-500">Single selection field, 3 rows. Verical aligned label.</span>
      <div class="p-2 grid w-full max-w-sm items-center gap-1.5">
        <Label for="reportType">Report Type</Label>
        <SingleSelect
          v-model = "selectedReportType"
          :items = "reportTypes"
          :maxVisibleItems = 3
          placeholder = "Select report ..."
          searchPlaceholder = "Search reports ..."
          emptyStateText = "No report found."
          groupHeading = "Report Types"
          listClass = "max-h-[168px] overflow-y-auto""
          @select = "onReportSelect"
        />
      </div>
      <div class="p-2 text-xs text-gray-500">
        Selected report type: {{ selectedReportType?.id }}, name: {{ selectedReportType?.label }}
      </div>
    </div>

    <div class="my-4 border border-solid border-gray-200 rounded-md bg-white">
      <span class="p-2 pt-4 text-xs text-blue-500">Single selection field. Verical aligned label.</span>
      <div class="p-2 grid w-full max-w-sm items-center gap-1.5">
        <Label for="reportType">Select Team</Label>
        <SingleSelect
          v-model = "selectedTeam"
          :items = "franchiseTeams"
          :maxVisibleItems = 5
          placeholder = "Select team ..."
          searchPlaceholder = "Search teams ..."
          emptyStateText = "No team found."
          groupHeading = "Franchise Teams"
          @select = "onTeamSelect"
        />
      </div>
      <div class="p-2 text-xs text-gray-500">
        Selected team: {{ selectedTeam?.id }}, name: {{ selectedTeam?.label }}
      </div>
    </div>

    <!-- Multi selection field, checkbox indicator, label -->
    <!-- <div class="my-4 border border-solid border-gray-200 rounded-md bg-white">
      <span class="p-2 pt-4 text-xs text-blue-500">Multi select selection field. Verical aligned label.</span>
      <div class="p-2 grid w-full max-w-sm items-center gap-1.5">
        <Label for="franchiseTeam">Team</Label>
        <MultiSelect></MultiSelect>
      </div>
      div class="p-2 text-xs text-gray-500">
        Selected team: {{ selectedTeam }}
      </div>
    </div> -->

    <!-- Single combo selection field, label -->
    <!-- <div class="my-4 border border-solid border-gray-200 rounded-md bg-white">
      <span class="p-2 pt-4 text-xs text-blue-500">Single combo selection field. Verical aligned label.</span>
      <div class="p-2 grid w-full max-w-sm items-center gap-1.5">
        <Label for="franchiseTeam">Team</Label>
        <SingleCombo></SingleCombo>
      </div>
      div class="p-2 text-xs text-gray-500">
        Selected team: {{ selectedTeam }}
      </div>
    </div> -->

    <!-- Multi combo selection field, checkbox indicator, label -->
    <!-- <div class="my-4 border border-solid border-gray-200 rounded-md bg-white">
      <span class="p-2 pt-4 text-xs text-blue-500">Single combo selection field. Verical aligned label.</span>
      <div class="p-2 grid w-full max-w-sm items-center gap-1.5">
        <Label for="franchiseTeam">Team</Label>
        <MultiCombo></MultiCombo>
      </div>
      div class="p-2 text-xs text-gray-500">
        Selected team: {{ selectedTeam }}
      </div>
    </div> -->

    <!-- <div class="my-4 border border-solid border-gray-200 rounded-md bg-white">
      <span class="p-2 pt-4 text-xs text-blue-500">Form component with validated input field.</span>
      <SimpleForm>
      </SimpleForm>
    </div> -->

    <!-- <div class="my-4 border border-solid border-gray-200 rounded-md bg-white">
      <span class="p-2 pt-4 text-xs text-blue-500">Data table.</span>
      <div class="p-2">
        Stuff
      </div>
    </div> -->

  </div>

  <!-- <div class="max-w-sm space-y-3">
    <SearchAutocomplete
      v-model="chosen"
      :items="libs"
      placeholder="Search libraries"
      searchPlaceholder="Type to filter…"
    />
    <p class="text-sm text-muted-foreground">
      Selected: <span class="font-medium">{{ chosen?.label ?? "—" }}</span>
    </p>
  </div> -->

  <!-- Footer -->
  <div class="h-4 mt-4 bg-yellow-200"></div>
</template>
