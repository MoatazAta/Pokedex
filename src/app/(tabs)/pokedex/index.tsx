import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PokemonList } from "@/src/components/PokemonList";

export default function PokedexScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F4F6", paddingTop: insets.top }}>
      <PokemonList />
    </View>
  );
}
