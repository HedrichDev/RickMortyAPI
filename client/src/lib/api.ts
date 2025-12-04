import { useQuery } from "@tanstack/react-query";

export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharacterResponse {
  info: Info;
  results: Character[];
}

const BASE_URL = "https://rickandmortyapi.com/api";

export async function getCharacters(page: number = 1, name?: string): Promise<CharacterResponse> {
  const params = new URLSearchParams();
  if (page) params.append("page", page.toString());
  if (name) params.append("name", name);

  const res = await fetch(`${BASE_URL}/character?${params.toString()}`);
  if (!res.ok) {
    if (res.status === 404) {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
    }
    throw new Error("Failed to fetch characters");
  }
  return res.json();
}

export async function getCharacter(id: string): Promise<Character> {
  const res = await fetch(`${BASE_URL}/character/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch character");
  }
  return res.json();
}

export async function getEpisodes(urls: string[]): Promise<{ id: number; name: string; episode: string }[]> {
  // Extract IDs from URLs
  const ids = urls.map(url => url.split('/').pop()).join(',');
  if (!ids) return [];

  const res = await fetch(`${BASE_URL}/episode/${ids}`);
  if (!res.ok) {
    throw new Error("Failed to fetch episodes");
  }
  
  const data = await res.json();
  // API returns object for single result, array for multiple
  return Array.isArray(data) ? data : [data];
}
