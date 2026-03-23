import { ThemeToggleHeaderRight } from "@/src/components/ThemeToggle";
import { Stack } from "expo-router";

const headerOptions = {
  headerTitleAlign: "center" as const,
  headerStyle: { backgroundColor: "#DC2626" },
  headerTintColor: "#FFFFFF",
  headerTitleStyle: { fontWeight: "600" as const },
  headerShadowVisible: false,
};

export default function PokedexLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Pokedex",
          ...headerOptions,
          headerRight: () => <ThemeToggleHeaderRight />,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: "Details",
          ...headerOptions,
        }}
      />
    </Stack>
  );
}
