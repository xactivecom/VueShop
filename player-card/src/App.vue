<script setup lang="ts">
import { ref, onMounted } from "vue";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { Search } from "lucide-vue-next"; // Search icon

import MultiSelect from "@/components/MultiSelect.vue";
import MultiSelectGrid, { type ColumnConfig } from "@/components/MultiSelectGrid.vue";

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
const selectedReportTypes = ref<ReportType[]>([]);

// Event handlers
const onReportTypeSelect = (reportType: ReportType, selected: boolean) => {
  console.log("Report type selected:", reportType, selected);
}
const onReportTypeSelectAll = (reportTypes: ReportType[]) => {
  console.log("Report types all selected:", reportTypes.length);
}
const onReportTypeClearAll = () => {
  console.log("Report types all cleared:");
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
const selectedGameTypes = ref<GameType[]>([]);

// Event handlers
const onGameTypeSelect = (gameType: GameType, selected: boolean) => {
  console.log("Game type selected:", gameType, selected);
}
const onGameTypeSelectAll = (gameTypes: GameType[]) => {
  console.log("Game types all selected:", gameTypes.length);
}
const onGameTypeClearAll = () => {
  console.log("Game types all cleared:");
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
const selectedSeasons = ref<Season[]>([]);

// Event handlers
const onSeasonSelect = (season: Season, selected: boolean) => {
  console.log("Season selected:", season, selected);
}
const onSeasonSelectAll = (seasons: Season[]) => {
  console.log("Seasons all selected:", seasons.length);
}
const onSeasonClearAll = () => {
  console.log("Seasons all cleared:");
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
const selectedTeams = ref<FranchiseTeam[]>([]);

// Event handlers
const onTeamSelect = (team: FranchiseTeam, selected: boolean) => {
  console.log("Team selected:", team, selected);
}
const onTeamSelectAll = (teams: FranchiseTeam[]) => {
  console.log("Teams all selected:", teams.length);
}
const onTeamClearAll = () => {
  console.log("Teams all cleared:");
}


// Team selections
interface Player {
  id: string;
  fullName: string;
  teamId: string;
  leagueId: string;
  jersey: number;
  position: string;
  birthDate?: string;
  age?: string;
}
const players: Player[] = [
  { id: "NHL-8478402", fullName: "Connor McDavid", teamId: "EDM", leagueId: "NHL", jersey: 97, position: "C", birthDate: "1997-01-13" },
  { id: "NHL-8477956", fullName: "David Pastrnak", teamId: "BOS", leagueId: "NHL", jersey: 88, position: "RW", birthDate: "1996-05-25" },
  { id: "NHL-8477492", fullName: "Nathan MacKinnon", teamId: "COL", leagueId: "NHL", jersey: 29, position: "C", birthDate: "1995-09-01" },
  { id: "NHL-8477934", fullName: "Leon Draisaitl", teamId: "EDM", leagueId: "NHL", jersey: 29, position: "C", birthDate: "1995-10-27" },
  { id: "NHL-8479318", fullName: "Auston Matthews", teamId: "TOR", leagueId: "NHL", jersey: 34, position: "C", birthDate: "1997-09-17" },
  { id: "NHL-8474578", fullName: "Erik Karlsson", teamId: "PIT", leagueId: "NHL", jersey: 65, position: "D", birthDate: "1990-05-31" },
  { id: "NHL-8476453", fullName: "Nikita Kucherov", teamId: "TBL", leagueId: "NHL", jersey: 86, position: "RW", birthDate: "1993-06-17" },
  { id: "NHL-8471675", fullName: "Sidney Crosby", teamId: "PIT", leagueId: "NHL", jersey: 87, position: "C", birthDate: "1987-08-07" },
  { id: "NHL-8471214", fullName: "Alex Ovechkin", teamId: "WSH", leagueId: "NHL", jersey: 8, position: "LW", birthDate: "1985-09-17" },
  { id: "NHL-8476945", fullName: "Connor Hellebuyck", teamId: "WPG", leagueId: "NHL", jersey: 37, position: "G", birthDate: "1993-05-19" },
  { id: "NHL-8480069", fullName: "Cale Makar", teamId: "COL", leagueId: "NHL", jersey: 8, position: "D", birthDate: "1998-10-30" },
  { id: "NHL-8477919", fullName: "Frederick Gaudreau", teamId: "SEA", leagueId: "NHL", jersey: 89, position: "C", birthDate: "1993-05-01" },
  { id: "NHL-8478427", fullName: "Sebastian Aho", teamId: "CAR", leagueId: "NHL", jersey: 20, position: "C" , birthDate: "1997-07-26"},
  { id: "NHL-8478864", fullName: "Kirill Kaprizov", teamId: "MIN", leagueId: "NHL", jersey: 97, position: "LW", birthDate: "1997-04-26" },
  { id: "NHL-8481559", fullName: "Jack Hughes", teamId: "NJD", leagueId: "NHL", jersey: 86, position: "C", birthDate: "2001-05-14" },
];

// Convert birh date to current age
const calcAgeFromBirth = (birthDate: string): string => {
  const today = new Date();
  const dateOfBirth = new Date(birthDate);
  let age = today.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = today.getMonth() - dateOfBirth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
    age--;
  }
  return age.toString();
};

// Player popup columns
const playerColumns: ColumnConfig<Player>[] = [
  { key: "fullName", label: "Name", width: 5 },
  { key: "teamId", label: "Team", width: 2 },
  { key: "leagueId", label: "League", width: 2, },
  { key: "position", label: "Pos", width: 1 },
  { key: "birthDate", label: "Age", width: 1, format: (date) => { return calcAgeFromBirth(date); }},
];

// Reactive state
const selectedPlayers = ref<Player[]>([]);

// Event handlers
const onPlayerSelect = (player: Player, selected: boolean) => {
  console.log("Player selected:", player, selected);
}


// Roster selections
interface Roster {
  id: string;
  fullName: string;
  teamName: string;
  leagueId: string;
}
const roster: Roster[] = [
  { id: "NHL-8478402", fullName: "Connor McDavid", teamName: "Edmonton Oilers", leagueId: "NHL" },
  { id: "NHL-8477956", fullName: "David Pastrnak", teamName: "Boston Bruins", leagueId: "NHL" },
  { id: "NHL-8477492", fullName: "Nathan MacKinnon", teamName: "Colorado Avalanche", leagueId: "NHL" },
  { id: "NHL-8481559", fullName: "Jack Hughes", teamName: "New Jersey Devils", leagueId: "NHL" },

  { id: "AHL-10551", fullName: "Ryan Kirwan", teamName: "Toronto Marlies", leagueId: "AHL" },
  { id: "AHL-10601", fullName: "Tyler Thorpe", teamName: "Laval Rockets", leagueId: "AHL" },

  { id: "OHL-888182", fullName: "Seth Ronan", teamName: "London Knights", leagueId: "OHL" },
  { id: "OHL-747988", fullName: "Carson Cameron", teamName: "Peterborough Petes", leagueId: "OHL" },
];

// Set default selections
onMounted(() => {
  // Default to the first report type
  // selectedReportType.value = reportTypes[0];

  // Default to the "All" team
  // selectedTeams.value = franchiseTeams ?? [franchiseTeams[0]];
});
</script>


<template>
  <!-- Header - fixed to top -->
  <div class="fixed top-0 left-0 w-full h-8 mb-4 bg-blue-500"></div>

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
      <div class="p-2 grid w-[180px] max-w-sm items-center gap-1.5">
        <Label for="reportType">Report Types</Label>
        <MultiSelect
          v-model = "selectedReportTypes"
          :items = "reportTypes"
          valueKey = "id"
          labelKey = "label"
          placeholder = "Select reports ..."
          searchPlaceholder = "Search report types ..."
          emptyStateText = "No report types found."
          groupHeading = "Report Types"
          :maxBadges = 1
          popoverClass = "w-[180px] p-0"
          listClass = "max-h-[168px] overflow-y-auto""
          :showSelectAll = false
          :showFooter = false
          @select = "onReportTypeSelect"
          @selectAll = "onReportTypeSelectAll"
          @clearAll = "onReportTypeClearAll"
        />
      </div>
      <div class="p-2 text-xs text-gray-500">
        Selected report types: {{ selectedReportTypes?.map(r => r.id).join(", ") }}
          ; names: {{ selectedReportTypes?.map(r => r.label).join(", ") }}
      </div>
    </div>

    <div class="my-4 border border-solid border-gray-200 rounded-md bg-white">
      <div class="p-2 grid w-[180px] max-w-sm items-center gap-1.5">
        <Label for="reportType">Game Types</Label>
        <MultiSelect
          v-model = "selectedGameTypes"
          :items = "gameTypes"
          valueKey = "id"
          labelKey = "label"
          placeholder = "Select game types ..."
          searchPlaceholder = "Search game types ..."
          emptyStateText = "No game types found."
          groupHeading = "Game types"
          :exclusiveValues = "['combined']"
          :maxBadges = 1
          popoverClass = "w-[180px] p-0"
          :showSelectAll = false
          :showFooter = false
          @select = "onGameTypeSelect"
          @selectAll = "onGameTypeSelectAll"
          @clearAll = "onGameTypeClearAll"
        />
      </div>
      <div class="p-2 text-xs text-gray-500">
        Selected game types: {{ selectedGameTypes?.map(r => r.id).join(", ") }}
          ; names: {{ selectedGameTypes?.map(r => r.label).join(", ") }}
      </div>
    </div>

    <div class="my-4 border border-solid border-gray-200 rounded-md bg-white">
      <div class="p-2 grid w-[180px] max-w-sm items-center gap-1.5">
        <Label for="reportType">Game Seasons</Label>
        <MultiSelect
          v-model = "selectedSeasons"
          :items = "seasons"
          valueKey = "id"
          labelKey = "label"
          placeholder = "Select seasons ..."
          searchPlaceholder = "Search seasons ..."
          emptyStateText = "No seasons found."
          groupHeading = "Seasons"
          :maxBadges = 1
          popoverClass = "w-[180px] p-0"
          :showFooter = false
          @select = "onSeasonSelect"
          @selectAll = "onSeasonSelectAll"
          @clearAll = "onSeasonClearAll"
        />
      </div>
      <div class="p-2 text-xs text-gray-500">
        Selected seasons: {{ selectedSeasons?.map(r => r.id).join(", ") }}
          ; names: {{ selectedSeasons?.map(r => r.label).join(", ") }}
      </div>
    </div>

    <div class="my-4 border border-solid border-gray-200 rounded-md bg-white">
      <div class="p-2 grid w-[200px] max-w-sm items-center gap-1.5">
        <Label for="reportType">Franchise Teams</Label>
        <MultiSelect
          v-model = "selectedTeams"
          :items = "franchiseTeams"
          valueKey = "id"
          labelKey = "label"
          badgeKey = "id"
          placeholder = "Select teams ..."
          searchPlaceholder = "Search teams ..."
          emptyStateText = "No matching teams found."
          groupHeading = "Franchise Teams"
          :maxBadges = 2
          popoverClass = "w-[240px] p-0"
          :showFooter = false
          @select = "onTeamSelect"
          @selectAll = "onTeamSelectAll"
          @clearAll = "onTeamClearAll"
        />
      </div>
      <div class="p-2 text-xs text-gray-500">
        Selected teams: {{ selectedTeams?.map(t => t.id).join(", ") }}
          ; names: {{ selectedTeams?.map(t => t.label).join(", ") }}
      </div>
    </div>

    <div class="my-4 border border-solid border-gray-200 rounded-md bg-white">
      <div class="p-2 grid w-[240px] max-w-sm items-center gap-1.5">
        <Label for="reportType">Select Players</Label>
        <MultiSelectGrid
          v-model = "selectedPlayers"
          :items = "players"
          :columns = "playerColumns"
          valueKey = "id"
          labelKey = "fullName"
          badgeKey = "fullName"
          placeholder = "Select players ..."
          searchPlaceholder = "Search players by name, team ..."
          emptyStateText = "No matching players found."
          :maxBadges = 1
          :showFooter = false
          popoverClass = "w-[500px] p-0"
          @select = "onPlayerSelect"
        />
      </div>
      <div class="p-2 text-xs text-gray-500">
        Selected players:
        <ul v-for="player in selectedPlayers">
          <li class="ml-2">id: {{ player.id }}; name: {{ player.fullName }}; team: {{ player.teamId }}</li>
        </ul>
      </div>
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

  </div>

  <!-- Footer - fixed to bottom -->
  <div class="fixed bottom-0 left-0 w-full h-4 mt-4 bg-yellow-200"></div>
</template>
