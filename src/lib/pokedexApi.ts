import { api } from "./axios";
import type { PokemonDetails, PokemonListResponse } from "@/src/types/pokemon";

export async function getPokemonList(offset = 0, limit = 20) {
  const { data } = await api.get<PokemonListResponse>("/pokemon", {
    params: { offset, limit },
  });
  return data;
}

export async function getPokemonDetails(idOrName: string | number) {
  const { data } = await api.get<PokemonDetails>(`/pokemon/${idOrName}`);
  return data;
}
