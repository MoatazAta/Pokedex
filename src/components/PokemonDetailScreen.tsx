import { usePokemonDetails } from "@/src/hooks/usePokemonDetails";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { PokemonDetail } from "./PokemonDetail";

export function PokemonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, isError } = usePokemonDetails(Number(id));

  if (isLoading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" colorClassName="accent-red-600" />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Text className="text-gray-500 text-base">Failed to load Pokemon</Text>
      </View>
    );
  }

  return <PokemonDetail pokemon={data} />;
}
