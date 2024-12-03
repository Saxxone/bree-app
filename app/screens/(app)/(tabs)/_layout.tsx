import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { headerDark, headerLight } from "@/styles/main";
import { useMemo } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  const tabBarIcon = useMemo(() => {
    return (
        icon:
          | "home-outline"
          | "search-outline"
          | "notifications-outline"
          | "chatbubble-outline",
      ) =>
      ({ color, focused }: { color: string; focused: boolean }) => (
        <Ionicons
          name={focused ? icon : icon}
          size={24}
          style={{ paddingVertical: 2 }}
          color={color}
        />
      );
  }, []);

  const colorScheme = useColorScheme();
  const header = colorScheme === "dark" ? headerDark : headerLight;
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
