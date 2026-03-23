import { PokemonList } from "@/src/components/PokemonList";
import { View } from "react-native";

export default function PokedexScreen() {
  return (
    <View className="flex-1 bg-gray-100 dark:bg-gray-950">
      <PokemonList />
    </View>
  );
}
