import type { PokemonDetails, PokemonListResponse } from "@/src/types/pokemon";
import { api } from "./axios";

export async function getPokemonList(offset = 0, limit = 20) {
  const { data } = await api.get<PokemonListResponse>("/pokemon", {
    params: { offset, limit },
  });
  return data;
}

export async function getPokemonDetails(id: number) {
  const { data } = await api.get<PokemonDetails>(`/pokemon/${id}`);
  return data;
}
