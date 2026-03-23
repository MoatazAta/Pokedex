import { getPokemonDetails } from "@/src/lib/pokedexApi";
import { useQuery } from "@tanstack/react-query";

export function usePokemonDetails(id: number) {
  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => getPokemonDetails(id),
    enabled: !!id,
  });
}
