import type { FavoritePokemon } from "@/src/types/pokemon";
import { useCallback, useMemo } from "react";
import { useMMKVString } from "react-native-mmkv";

const FAVORITES_KEY = "favorites";

export function useFavorites() {
  const [raw, setRaw] = useMMKVString(FAVORITES_KEY);

  const favorites: FavoritePokemon[] = useMemo(
    () => (raw ? JSON.parse(raw) : []),
    [raw],
  );

  const favoriteIds = useMemo(
    () => new Set(favorites.map((f) => f.id)),
    [favorites],
  );

  const isFavorite = useCallback(
    (id: number) => favoriteIds.has(id),
    [favoriteIds],
  );

  const toggleFavorite = useCallback(
    (pokemon: FavoritePokemon) => {
      const current: FavoritePokemon[] = raw ? JSON.parse(raw) : [];
      const exists = current.some((f) => f.id === pokemon.id);
      const next = exists
        ? current.filter((f) => f.id !== pokemon.id)
        : [...current, pokemon];
      setRaw(JSON.stringify(next));
    },
    [raw, setRaw],
  );

  return { favorites, isFavorite, toggleFavorite };
}
