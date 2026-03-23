import { PokemonCard } from "@/src/components/PokemonCard";
import { useFavorites } from "@/src/hooks/useFavorites";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { FlatList, Text, View } from "react-native";
import { useUniwind } from "uniwind";

export default function FavoritesScreen() {
  const { favorites } = useFavorites();
  const router = useRouter();
  const { theme } = useUniwind();
  const isDark = theme === "dark";

  const handlePress = useCallback(
    (id: number) => {
      router.push(`/pokemon/${id}`);
    },
    [router],
  );

  if (favorites.length === 0) {
    return (
      <View className="flex-1 bg-gray-100 dark:bg-gray-950 justify-center items-center px-8">
        <MaterialIcons
          name="favorite-border"
          size={64}
          color={isDark ? "#374151" : "#D1D5DB"}
        />
        <Text className="text-lg font-bold text-gray-400 dark:text-gray-500 mt-4 text-center">
          No favorites yet
        </Text>
        <Text className="text-sm text-gray-300 dark:text-gray-600 mt-1 text-center">
          Tap the heart on a Pokémon to save it here
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 dark:bg-gray-950">
      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperClassName="gap-3"
        contentContainerClassName="p-3"
        renderItem={({ item }) => (
          <PokemonCard
            item={{
              name: item.name,
              url: `https://pokeapi.co/api/v2/pokemon/${item.id}/`,
            }}
            onPress={handlePress}
          />
        )}
      />
    </View>
  );
}
