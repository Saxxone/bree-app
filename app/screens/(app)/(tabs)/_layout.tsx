import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { useMemo } from "react";
import { useColorScheme } from "react-native";
import { headerDark, headerLight } from "@/app_directories/styles/main";

export default function TabLayout() {
  const tabBarIcon = useMemo(() => {
    return (
        icon:
          | "home-outline"
          | "search-outline"
          | "notifications-outline"
          | "chatbubble-outline",
      ) =>
      ({ color }: { color: string }) => (
        <Ionicons
          name={icon}
          size={24}
          style={{ paddingVertical: 2 }}
          color={color}
        />
      );
  }, []);

  const color_scheme = useColorScheme();
  const header = color_scheme === "dark" ? headerDark : headerLight;

  return (
    <Tabs screenOptions={header}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: "",
          tabBarIcon: tabBarIcon("home-outline"),
        }}
      />
      <Tabs.Screen
        name="(explore)"
        options={{
          title: "",
          tabBarIcon: tabBarIcon("search-outline"),
        }}
      />
      <Tabs.Screen
        name="(notifications)"
        options={{
          title: "",
          tabBarIcon: tabBarIcon("notifications-outline"),
        }}
      />
      <Tabs.Screen
        name="(messages)"
        options={{
          title: "",
          tabBarIcon: tabBarIcon("chatbubble-outline"),
        }}
      />
    </Tabs>
  );
}
