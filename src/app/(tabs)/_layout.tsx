import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#DC2626",
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
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
