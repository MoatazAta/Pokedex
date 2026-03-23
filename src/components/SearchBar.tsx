import { MaterialIcons } from "@expo/vector-icons";
import { useRef } from "react";
import { Pressable, TextInput } from "react-native";
import { useUniwind } from "uniwind";

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
  const { theme } = useUniwind();
  const isDark = theme === "dark";

  return (
    <Pressable
      className="flex-row items-center bg-white dark:bg-gray-800 rounded-2xl my-3 px-4 py-3 gap-3 shadow-sm"
      onPress={() => inputRef.current?.focus()}
    >
      <MaterialIcons
        name="search"
        size={20}
        color={isDark ? "#6B7280" : "#9CA3AF"}
      />
      <TextInput
        ref={inputRef}
        className="flex-1 text-[15px] text-gray-800 dark:text-gray-100 p-0"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <Pressable
          onPress={() => onChangeText("")}
          className="rounded-full bg-gray-200 dark:bg-gray-700 p-1 active:bg-gray-300 dark:active:bg-gray-600"
          hitSlop={8}
        >
          <MaterialIcons
            name="close"
            size={14}
            color={isDark ? "#9CA3AF" : "#6B7280"}
          />
        </Pressable>
      )}
    </Pressable>
  );
}
