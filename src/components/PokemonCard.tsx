import type { PokemonListItem } from "@/src/types/pokemon";
import { Image, Pressable, Text } from "react-native";

function getIdFromUrl(url: string): number {
  const segments = url.replace(/\/$/, "").split("/");
  return Number(segments[segments.length - 1]);
}

function getSpriteUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

interface PokemonCardProps {
  item: PokemonListItem;
  onPress: (id: number) => void;
}

export function PokemonCard({ item, onPress }: PokemonCardProps) {
  const id = getIdFromUrl(item.url);

  return (
    <Pressable
      className="flex-1 bg-white rounded-2xl items-center pt-4 pb-3 mb-3 shadow-sm active:opacity-85 active:scale-[0.97]"
      onPress={() => onPress(id)}
    >
      <Image
        source={{ uri: getSpriteUrl(id) }}
        className="w-[100px] h-[100px]"
      />
      <Text className="text-xs font-semibold text-gray-400 mt-2">
        #{String(id).padStart(3, "0")}
      </Text>
      <Text className="text-[15px] font-bold text-gray-800 capitalize mt-0.5">
        {item.name}
      </Text>
    </Pressable>
  );
}
