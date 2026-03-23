import { useTheme } from "@/src/hooks/useTheme";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

export function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <Pressable
      onPress={toggle}
      className="bg-white/20 rounded-full p-2 active:scale-[0.9]"
      hitSlop={8}
    >
      <MaterialIcons
        name={isDark ? "light-mode" : "dark-mode"}
        size={20}
        color="white"
      />
    </Pressable>
  );
}

export function ThemeToggleHeaderRight() {
  return (
    <View className="mr-2">
      <ThemeToggle />
    </View>
  );
}
