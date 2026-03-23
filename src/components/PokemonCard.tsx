import type { PokemonListItem } from "@/src/types/pokemon";
import { Image, Pressable, StyleSheet, Text } from "react-native";

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
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => onPress(id)}
    >
      <Image source={{ uri: getSpriteUrl(id) }} style={styles.image} />
      <Text style={styles.id}>#{String(id).padStart(3, "0")}</Text>
      <Text style={styles.name}>{item.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  image: {
    width: 100,
    height: 100,
  },
  id: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9CA3AF",
    marginTop: 8,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2937",
    textTransform: "capitalize",
    marginTop: 2,
  },
});
