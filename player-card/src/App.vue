<script setup lang="ts">
import { ref } from "vue";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

// import { Search } from "lucide-vue-next"; // Search icon

import MultiSelect from "@/components/MultiSelect.vue";

// Search model for activeOnly checkbox
const isActiveOnly = ref(true);

// Report type selections
interface ReportType {
  id: String;
  label: string;
}
const reportTypes: ReportType[] = [
  { id: "summary", label: "Summary" },
  { id: "bio", label: "Bio Info" },
  { id: "faceoff", label: "Face-off" },
  { id: "goals", label: "Goals" },
  { id: "penalties", label: "Penalties" },
];

// Reactive state
const selectedReportTypes = ref<ReportType[] | null>([]);

// Event handlers
const onReportTypeSelect = (reportType: ReportType, selected: boolean) => {
  console.log('Report type selected:', reportType, selected);
}
const onReportTypeSelectAll = (reportTypes: ReportType[]) => {
  console.log('Report types all selected:', reportTypes.length);
}
const onReportTypeClearAll = () => {
  console.log('Report types all cleared:');
}

// Season selections
interface Season {
  id: String;
  label: string;
}
const seasons: Season[] = [
  { id: "20252026", label: "2025-26" },
  { id: "20242025", label: "2024-25" },
  { id: "20232024", label: "2023-24" },
  { id: "20222023", label: "2022-23" },
  { id: "20212022", label: "2021-22" },
  { id: "20202021", label: "2020-21" },
  { id: "20192020", label: "2019-20" },
  { id: "20182019", label: "2018-19" },
  { id: "20172018", label: "2017-18" },
  { id: "20102011", label: "2010-11" },
  { id: "20002001", label: "2000-01" },
  { id: "19992000", label: "1999-00" },
  { id: "19901991", label: "1990-91" },
  { id: "19801981", label: "1980-81" },
  { id: "19711972", label: "1971-72" },
  { id: "19701971", label: "1970-71" },
  { id: "19611962", label: "1961-62" },
  { id: "19601961", label: "1960-61" },
  { id: "19511952", label: "1951-52" },
  { id: "19501951", label: "1950-51" },
];

// Reactive state
const selectedSeasons = ref<Season[] | null>([]);

// Event handlers
const onSeasonSelect = (season: Season, selected: boolean) => {
  console.log('Season selected:', season, selected);
}
const onSeasonSelectAll = (seasons: Season[]) => {
  console.log('Seasons all selected:', seasons.length);
}
const onSeasonClearAll = () => {
  console.log('Seasons all cleared:');
}

// Game type selections
interface GameType {
  id: String;
  label: string;
}
const gameTypes: GameType[] = [
  { id: "regular", label: "Regular Season" },
  { id: "playoff", label: "Playoffs" },
  { id: "combined", label: "Combined" }, // Exclusive
];

// Reactive state
const selectedGameTypes = ref<GameType[] | null>([]);

// Event handlers
const onGameTypeSelect = (gameType: GameType, selected: boolean) => {
  console.log('Game type selected:', gameType, selected);
}
const onGameTypeSelectAll = (gameTypes: GameType[]) => {
  console.log('Game types all selected:', gameTypes.length);
}
const onGameTypeClearAll = () => {
  console.log('Game types all cleared:');
}

// Team selections
interface FranchiseTeam {
  id: String;
  label: string;
}
const franchiseTeams: FranchiseTeam[] = [
  { id: "ANA", label: "Anaheim Ducks" },
  { id: "BOS", label: "Boston Bruins" },
  { id: "BUF", label: "Buffalo Sabres" },
  { id: "CGY", label: "Calgary Flames" },
  { id: "CAR", label: "Carolina Hurricanes" },
  { id: "CHI", label: "Chicago Blackhawks" },
  { id: "COL", label: "Colorado Avalanche" },
  { id: "CBJ", label: "Columbus Blue Jackets" },
  { id: "DAS", label: "Dallas Stars" },
  { id: "DET", label: "Detroit Red Wings" },
  { id: "EDM", label: "Edmonton Oilers" },
  { id: "MIN", label: "Minnesota Wild" },
  { id: "NJD", label: "New Jersey Devils" },
  { id: "PIT", label: "Pittsburgh Penguins" },
  { id: "SEA", label: "Seattle Kraken" },
  { id: "TBL", label: "Tampa Bay Lightning" },
  { id: "WSH", label: "Washington Capitals" },
  { id: "WPG", label: "Winnipeg Jets" },
];

// Reactive state
const selectedTeams = ref<FranchiseTeam[] | null>([]);

// Event handlers
const onTeamSelect = (team: FranchiseTeam, selected: boolean) => {
  console.log('Team selected:', team, selected);
}
const onTeamSelectAll = (teams: FranchiseTeam[]) => {
  console.log('Teams all selected:', teams.length);
}
const onTeamClearAll = () => {
  console.log('Teams all cleared:');
}


// Team selections
interface Player {
  id: string;
  fullName: string;
  teamId: string;
  jersey: number;
  position: string
}
const players: Player[] = [
  { id: "NHL-8478402", fullName: "Connor McDavid", teamId: "EDM", jersey: 97, position: "C" },
  { id: "NHL-8477956", fullName: "David Pastrnak", teamId: "BOS", jersey: 88, position: "RW" },
  { id: "NHL-8477492", fullName: "Nathan MacKinnon", teamId: "COL", jersey: 29, position: "C" },
  { id: "NHL-8477934", fullName: "Leon Draisaitl", teamId: "EDM", jersey: 29, position: "C" },
  { id: "NHL-8479318", fullName: "Auston Matthews", teamId: "TOR", jersey: 34, position: "C" },
  { id: "NHL-8474578", fullName: "Erik Karlsson", teamId: "PIT", jersey: 65, position: "D" },
  { id: "NHL-8476453", fullName: "Nikita Kucherov", teamId: "TBL", jersey: 86, position: "RW" },
  { id: "NHL-8471675", fullName: "Sidney Crosby", teamId: "PIT", jersey: 87, position: "C" },
  { id: "NHL-8471214", fullName: "Alex Ovechkin", teamId: "WSH", jersey: 8, position: "LW" },
  { id: "NHL-8476945", fullName: "Connor Hellebuyck", teamId: "WPG", jersey: 37, position: "G" },
  { id: "NHL-8480069", fullName: "Cale Makar", teamId: "COL", jersey: 8, position: "D" },
  { id: "NHL-8477919", fullName: "Frederick Gaudreau", teamId: "SEA", jersey: 89, position: "C" },
  { id: "NHL-8478427", fullName: "Sebastian Aho", teamId: "CAR", jersey: 20, position: "C" },
  { id: "NHL-8478864", fullName: "Kirill Kaprizov", teamId: "MIN", jersey: 97, position: "LW" },
  { id: "NHL-8481559", fullName: "Jack Hughes", teamId: "NJD", jersey: 86, position: "C" },
];

// Set default selections
import { onMounted } from 'vue';
onMounted(() => {
  // Default to the first report type
  // selectedReportType.value = reportTypes[0];

  // Default to the "All" team
  // selectedTeams.value = franchiseTeams ?? [franchiseTeams[0]];
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
      <div class="p-2 grid w-full max-w-sm items-center gap-1.5">
        <Label for="reportType">Report Type</Label>
        <MultiSelect
          :v-model = "selectedReportTypes"
          :items = "reportTypes"
          valueKey = "id"
          labelKey = "label"
          placeholder = "Select report ..."
          searchPlaceholder = "Search report types ..."
          emptyStateText = "No report types found."
          groupHeading = "Report Types"
          :maxSelections = 1
          listClass = "max-h-[168px] overflow-y-auto""
          :showSelectAll = false
          :showFooter = false
          @select = "onReportTypeSelect"
          @selectAll = "onReportTypeSelectAll"
          @clearAll = "onReportTypeClearAll"
        />
      </div>
      <div class="p-2 text-xs text-gray-500">
        Selected report types: {{ selectedReportTypes?.map(r => r.id).join(', ') }}
          ; names: {{ selectedReportTypes?.map(r => r.label).join(', ') }}
      </div>
    </div>

    <div class="my-4 border border-solid border-gray-200 rounded-md bg-white">
      <div class="p-2 grid w-full max-w-sm items-center gap-1.5">
        <Label for="reportType">Game Types</Label>
        <MultiSelect
          :v-model = "selectedGameTypes"
          :items = "gameTypes"
          valueKey = "id"
          labelKey = "label"
          placeholder = "Select game types ..."
          searchPlaceholder = "Search game types ..."
          emptyStateText = "No game types found."
          groupHeading = "Game types"
          :exclusiveValues = "['combined']"
          :maxBadges = 2
          :showSelectAll = false
          :showFooter = false
          @select = "onGameTypeSelect"
          @selectAll = "onGameTypeSelectAll"
          @clearAll = "onGameTypeClearAll"
        />
      </div>
      <div class="p-2 text-xs text-gray-500">
        Selected game types: {{ selectedGameTypes?.map(r => r.id).join(', ') }}
          ; names: {{ selectedGameTypes?.map(r => r.label).join(', ') }}
      </div>
    </div>

    <div class="my-4 border border-solid border-gray-200 rounded-md bg-white">
      <div class="p-2 grid w-full max-w-sm items-center gap-1.5">
        <Label for="reportType">Seasons</Label>
        <MultiSelect
          :v-model = "selectedSeasons"
          :items = "seasons"
          valueKey = "id"
          labelKey = "label"
          placeholder = "Select season ..."
          searchPlaceholder = "Search seasons ..."
          emptyStateText = "No seasons found."
          groupHeading = "Seasons"
          :maxBadges = 2
          :showFooter = false
          @select = "onSeasonSelect"
          @selectAll = "onSeasonSelectAll"
          @clearAll = "onSeasonClearAll"
        />
      </div>
      <div class="p-2 text-xs text-gray-500">
        Selected seasons: {{ selectedSeasons?.map(r => r.id).join(', ') }}
          ; names: {{ selectedSeasons?.map(r => r.label).join(', ') }}
      </div>
    </div>

    <div class="my-4 border border-solid border-gray-200 rounded-md bg-white">
      <div class="p-2 grid w-full max-w-sm items-center gap-1.5">
        <Label for="reportType">Select Teams</Label>
        <MultiSelect
          :v-model = "selectedTeams"
          :items = "franchiseTeams"
          valueKey = "id"
          labelKey = "label"
          badgeKey = "id"
          placeholder = "Select teams ..."
          searchPlaceholder = "Search teams ..."
          emptyStateText = "No teams found."
          groupHeading = "Franchise Teams"
          :maxBadges = 2
          :showFooter = false
          @select = "onTeamSelect"
          @selectAll = "onTeamSelectAll"
          @clearAll = "onTeamClearAll"
        />
      </div>
      <div class="p-2 text-xs text-gray-500">
        Selected teams: {{ selectedTeams?.map(t => t.id).join(', ') }}
          ; names: {{ selectedTeams?.map(t => t.label).join(', ') }}
      </div>
    </div>

    <!-- <div class="my-4 border border-solid border-gray-200 rounded-md bg-white">
      <span class="p-2 pt-4 text-xs text-blue-500">Form component with validated input field.</span>
      <SimpleForm>
      </SimpleForm>
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
