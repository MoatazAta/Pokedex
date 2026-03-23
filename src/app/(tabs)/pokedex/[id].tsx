import { PokemonDetail } from "@/src/components/PokemonDetail";
import { usePokemonDetails } from "@/src/hooks/usePokemonDetails";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";

export default function PokemonDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, isError } = usePokemonDetails(id);

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
