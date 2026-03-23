import { usePokemonList } from "@/src/hooks/usePokemonList";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native";
import { PokemonCard } from "./PokemonCard";
import { SearchBar } from "./SearchBar";

export function PokemonList() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, refetch, isRefetching } =
    usePokemonList();

  const pokemon = useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data],
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return pokemon;
    return pokemon.filter((p) => p.name.includes(query));
  }, [pokemon, search]);

  const handlePress = useCallback(
    (id: number) => {
      router.push(`/pokemon/${id}`);
    },
    [router],
  );

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" colorClassName="accent-red-600" />
      </View>
    );
  }

  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => item.name}
      numColumns={2}
      columnWrapperClassName="gap-3"
      contentContainerClassName="px-3 pb-3"
      keyboardShouldPersistTaps="handled"
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor="#DC2626" colors={["#DC2626"]} />
      }
      ListHeaderComponent={
        <SearchBar value={search} onChangeText={setSearch} />
      }
      ListEmptyComponent={
        <View className="items-center pt-16 px-8">
          <Text className="text-base font-semibold text-gray-400 dark:text-gray-500">
            No Pokémon found
          </Text>
          <Text className="text-sm text-gray-300 dark:text-gray-600 mt-1">
            Try a different name
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <PokemonCard item={item} onPress={handlePress} />
      )}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator
            size="small"
            colorClassName="accent-red-600"
            className="py-5"
          />
        ) : null
      }
    />
  );
}
