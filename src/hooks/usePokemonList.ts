import { getPokemonList } from "@/src/lib/pokedexApi";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 20;

export function usePokemonList() {
  return useInfiniteQuery({
    queryKey: ["pokemonList"],
    queryFn: ({ pageParam = 0 }) => getPokemonList(pageParam, PAGE_SIZE),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.next ? lastPageParam + PAGE_SIZE : undefined,
  });
}
