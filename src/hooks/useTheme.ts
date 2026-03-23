import { useCallback } from "react";
import { useMMKVString } from "react-native-mmkv";
import { Uniwind, useUniwind } from "uniwind";

type ThemeMode = "light" | "dark";

const THEME_KEY = "theme-mode";

export function useTheme() {
  const { theme } = useUniwind();
  const [stored, setStored] = useMMKVString(THEME_KEY);

  const mode: ThemeMode = (stored as ThemeMode) || "light";
  const isDark = theme === "dark";

  const toggle = useCallback(() => {
    const next: ThemeMode = mode === "light" ? "dark" : "light";
    setStored(next);
    Uniwind.setTheme(next);
  }, [mode, setStored]);

  return { mode, isDark, toggle } as const;
}

export function restoreTheme() {
  try {
    const { createMMKV } = require("react-native-mmkv");
    const mmkv = createMMKV({ id: "default" });
    const stored = mmkv.getString(THEME_KEY) as ThemeMode | undefined;
    if (stored) {
      Uniwind.setTheme(stored);
    }
  } catch {
    // noop
  }
}
