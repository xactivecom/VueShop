/* Data transfer objects */

export interface GameType {
  id: string;
  label: string;
}

export interface Season {
  id: string;
  label: string;
}

export interface Player {
  id: string;
  fullName: string;
  teamId: string;
  leagueId: string;
  jersey: number;
  position: string;
  birthDate?: string;
  age?: string;
}

export interface Team {
  id: string;
  label: string;
}
