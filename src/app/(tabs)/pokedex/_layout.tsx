import { ThemeToggleHeaderRight } from "@/src/components/ThemeToggle";
import { Stack } from "expo-router";

export default function PokedexLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Pokedex",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#DC2626" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "600" },
          headerShadowVisible: false,
          headerRight: () => <ThemeToggleHeaderRight />,
        }}
      />
    </Stack>
  );
}
