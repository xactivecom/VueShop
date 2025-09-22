import type { PlayerTag, PlayerDetail } from "../types.ts";

async function searchPlayersByName(name: string): Promise<PlayerTag[]> {
  const result = await fetch("/http://localhost:4000/players?name=" + name);
  return result.json();
}

async function getPlayerById(id: number): Promise<PlayerDetail> {
  const result = await fetch("/http://localhost:4000/player?id=" + id);
  return result.json();
}