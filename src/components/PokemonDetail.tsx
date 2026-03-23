import { useFavorites } from "@/src/hooks/useFavorites";
import type { PokemonDetails } from "@/src/types/pokemon";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions, Image, Pressable, ScrollView, Text, View } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const TYPE_COLORS: Record<string, { bg: string; badge: string }> = {
  normal: { bg: "bg-[#A8A878]", badge: "bg-[#6D6D4E]" },
  fire: { bg: "bg-[#F08030]", badge: "bg-[#9C531F]" },
  water: { bg: "bg-[#6890F0]", badge: "bg-[#445E9C]" },
  electric: { bg: "bg-[#F8D030]", badge: "bg-[#A1871F]" },
  grass: { bg: "bg-[#78C850]", badge: "bg-[#4E8234]" },
  ice: { bg: "bg-[#98D8D8]", badge: "bg-[#638D8D]" },
  fighting: { bg: "bg-[#C03028]", badge: "bg-[#7D1F1A]" },
  poison: { bg: "bg-[#A040A0]", badge: "bg-[#682A68]" },
  ground: { bg: "bg-[#E0C068]", badge: "bg-[#927D44]" },
  flying: { bg: "bg-[#A890F0]", badge: "bg-[#6D5E9C]" },
  psychic: { bg: "bg-[#F85888]", badge: "bg-[#A13959]" },
  bug: { bg: "bg-[#A8B820]", badge: "bg-[#6D7815]" },
  rock: { bg: "bg-[#B8A038]", badge: "bg-[#786824]" },
  ghost: { bg: "bg-[#705898]", badge: "bg-[#493963]" },
  dragon: { bg: "bg-[#7038F8]", badge: "bg-[#4924A1]" },
  dark: { bg: "bg-[#705848]", badge: "bg-[#49392F]" },
  steel: { bg: "bg-[#B8B8D0]", badge: "bg-[#787887]" },
  fairy: { bg: "bg-[#EE99AC]", badge: "bg-[#9B6470]" },
};

const STAT_META: Record<string, { label: string; color: string }> = {
  hp: { label: "HP", color: "bg-[#FF5959]" },
  attack: { label: "ATK", color: "bg-[#F5AC78]" },
  defense: { label: "DEF", color: "bg-[#FAE078]" },
  "special-attack": { label: "SP.ATK", color: "bg-[#9DB7F5]" },
  "special-defense": { label: "SP.DEF", color: "bg-[#A7DB8D]" },
  speed: { label: "SPD", color: "bg-[#FA92B2]" },
};

function StatBar({ name, value }: { name: string; value: number }) {
  const meta = STAT_META[name] ?? { label: name, color: "bg-gray-300" };
  const percentage = Math.min((value / 255) * 100, 100);

  return (
    <View className="flex-row items-center py-[6px]">
      <Text className="w-14 text-[11px] font-semibold text-gray-400">
        {meta.label}
      </Text>
      <Text className="w-8 text-[13px] font-bold text-gray-800 text-right mr-3 tabular-nums">
        {value}
      </Text>
      <View className="flex-1 h-[4px] bg-gray-100 rounded-full overflow-hidden">
        <View
          className={`h-full rounded-full ${meta.color}`}
          style={{ width: `${percentage}%` }}
        />
      </View>
    </View>
  );
}

interface PokemonDetailProps {
  pokemon: PokemonDetails;
}

export function PokemonDetail({ pokemon }: PokemonDetailProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(pokemon.id);
  const artwork = pokemon.sprites.other["official-artwork"].front_default;
  const totalStats = pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0);
  const primaryType = pokemon.types[0]?.type.name ?? "normal";
  const theme = TYPE_COLORS[primaryType] ?? TYPE_COLORS.normal;
  const imageSize = SCREEN_WIDTH * 0.48;

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerClassName="pb-12"
      showsVerticalScrollIndicator={false}
    >
        {/* Type-colored hero */}
        <View className={`${theme.bg} items-center pb-6 rounded-b-[36px]`}>
          {/* Favorite button */}
          <Pressable
            className="absolute top-4 right-4 z-10 bg-white/20 rounded-full p-2 active:scale-[0.9]"
            onPress={() => toggleFavorite({ id: pokemon.id, name: pokemon.name })}
          >
            <MaterialIcons
              name={favorited ? "favorite" : "favorite-border"}
              size={24}
              color={favorited ? "#FF4D6D" : "white"}
            />
          </Pressable>

          {/* Name */}
          <Text className="text-[26px] font-bold text-white capitalize text-center mt-5">
            {pokemon.name}
          </Text>

        {/* Type badges */}
        <View className="flex-row justify-center gap-2 mt-2">
          {pokemon.types.map(({ type }) => (
            <View
              key={type.name}
              className={`px-4 py-1 rounded-full ${TYPE_COLORS[type.name]?.badge ?? "bg-black/20"}`}
            >
              <Text className="text-white text-[11px] font-bold uppercase tracking-wider">
                {type.name}
              </Text>
            </View>
          ))}
        </View>

        {/* Artwork */}
        <View className="items-center mt-4">
          {artwork && (
            <Image
              source={{ uri: artwork }}
              style={{ width: imageSize, height: imageSize }}
              resizeMode="contain"
            />
          )}
        </View>
      </View>

      {/* Weight & Height */}
      <View className="flex-row mx-5 mt-5 bg-gray-50 rounded-2xl py-4">
        <View className="flex-1 items-center">
          <Text className="text-[17px] font-bold text-gray-800">
            {(pokemon.weight / 10).toFixed(1)} kg
          </Text>
          <Text className="text-[11px] text-gray-400 font-medium mt-0.5">
            Weight
          </Text>
        </View>
        <View className="w-px bg-gray-200 my-1" />
        <View className="flex-1 items-center">
          <Text className="text-[17px] font-bold text-gray-800">
            {(pokemon.height / 10).toFixed(1)} m
          </Text>
          <Text className="text-[11px] text-gray-400 font-medium mt-0.5">
            Height
          </Text>
        </View>
      </View>

      {/* Abilities */}
      <View className="mx-5 mt-5">
        <Text className="text-[13px] font-bold text-gray-800 mb-2">
          Abilities
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {pokemon.abilities.map(({ ability, is_hidden }) => (
            <View
              key={ability.name}
              className={`px-3 py-[5px] rounded-full ${
                is_hidden
                  ? "border border-dashed border-gray-300"
                  : "bg-gray-100"
              }`}
            >
              <Text className="text-[12px] font-medium text-gray-600 capitalize">
                {ability.name.replace(/-/g, " ")}
                {is_hidden ? " (hidden)" : ""}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Base Stats */}
      <View className="mx-5 mt-5">
        <Text className="text-[13px] font-bold text-gray-800 mb-1">
          Base Stats
        </Text>
        {pokemon.stats.map(({ stat, base_stat }) => (
          <StatBar key={stat.name} name={stat.name} value={base_stat} />
        ))}
        <View className="border-t border-gray-100 mt-1 pt-[6px] flex-row items-center">
          <Text className="w-14 text-[11px] font-semibold text-gray-400">
            TOTAL
          </Text>
          <Text className="w-8 text-[13px] font-extrabold text-gray-900 text-right mr-3 tabular-nums">
            {totalStats}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
