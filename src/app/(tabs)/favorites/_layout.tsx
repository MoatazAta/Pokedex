import { ThemeToggleHeaderRight } from "@/src/components/ThemeToggle";
import { Stack } from "expo-router";

const headerOptions = {
  headerTitleAlign: "center" as const,
  headerStyle: { backgroundColor: "#DC2626" },
  headerTintColor: "#fff",
  headerTitleStyle: { fontWeight: "bold" as const },
  headerShadowVisible: false,
};

export default function FavoritesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Favorites",
          ...headerOptions,
          headerRight: () => <ThemeToggleHeaderRight />,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Details",
          ...headerOptions,
        }}
      />
    </Stack>
  );
}
