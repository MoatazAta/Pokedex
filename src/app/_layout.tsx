import "../../global.css";

import { restoreTheme } from "@/src/hooks/useTheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

restoreTheme();

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="pokemon/[id]"
          options={{
            presentation: "modal",
            headerTitle: "Details",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#DC2626" },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: { fontWeight: "600" },
            headerShadowVisible: false,
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
