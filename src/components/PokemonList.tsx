import { PokemonCard } from "@/src/components/PokemonCard";
import { usePokemonList } from "@/src/hooks/usePokemonList";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

export function PokemonList() {
  const router = useRouter();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    usePokemonList();

  const pokemon = useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data],
  );

  const handlePress = useCallback(
    (id: number) => {
      router.push(`/(tabs)/pokedex/${id}`);
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
      data={pokemon}
      keyExtractor={(item) => item.name}
      numColumns={2}
      columnWrapperClassName="gap-3"
      contentContainerClassName="p-3"
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
