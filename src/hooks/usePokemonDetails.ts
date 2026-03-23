import { getPokemonDetails } from "@/src/lib/pokedexApi";
import { useQuery } from "@tanstack/react-query";

export function usePokemonDetails(idOrName: string | number) {
  return useQuery({
    queryKey: ["pokemon", idOrName],
    queryFn: () => getPokemonDetails(idOrName),
    enabled: !!idOrName,
  });
}
