import { ThemeToggleHeaderRight } from "@/src/components/ThemeToggle";
import { Stack } from "expo-router";

export default function FavoritesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Favorites",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#DC2626" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          headerShadowVisible: false,
          headerRight: () => <ThemeToggleHeaderRight />,
        }}
      />
    </Stack>
  );
}
