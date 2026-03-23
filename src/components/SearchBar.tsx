import { MaterialIcons } from "@expo/vector-icons";
import { useRef } from "react";
import { Pressable, TextInput } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Search Pokémon…",
}: SearchBarProps) {
  const inputRef = useRef<TextInput>(null);

  return (
    <Pressable
      className="flex-row items-center bg-white rounded-2xl my-3 px-4 py-3 gap-3 shadow-sm"
      onPress={() => inputRef.current?.focus()}
    >
      <MaterialIcons name="search" size={20} color="#9CA3AF" />
      <TextInput
        ref={inputRef}
        className="flex-1 text-[15px] text-gray-800 p-0"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <Pressable
          onPress={() => onChangeText("")}
          className="rounded-full bg-gray-200 p-1 active:bg-gray-300"
          hitSlop={8}
        >
          <MaterialIcons name="close" size={14} color="#6B7280" />
        </Pressable>
      )}
    </Pressable>
  );
}
