import { PokemonCard } from "@/src/components/PokemonCard";
import { usePokemonList } from "@/src/hooks/usePokemonList";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

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
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#DC2626" />
      </View>
    );
  }

  return (
    <FlatList
      data={pokemon}
      keyExtractor={(item) => item.name}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <PokemonCard item={item} onPress={handlePress} />
      )}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator
            size="small"
            color="#DC2626"
            style={styles.footer}
          />
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 12,
  },
  row: {
    gap: 12,
  },
  footer: {
    paddingVertical: 20,
  },
});
