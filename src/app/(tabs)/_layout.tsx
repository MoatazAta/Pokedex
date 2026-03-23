import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useUniwind } from "uniwind";

export default function TabLayout() {
  const { theme } = useUniwind();
  const isDark = theme === "dark";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#DC2626",
        tabBarInactiveTintColor: isDark ? "#6B7280" : "#9CA3AF",
        tabBarStyle: {
          backgroundColor: isDark ? "#111827" : "#FFFFFF",
          borderTopColor: isDark ? "#1F2937" : "#E5E7EB",
        },
      }}
    >
      <Tabs.Screen
        name="pokedex"
        options={{
          title: "Pokédex",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="catching-pokemon" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
