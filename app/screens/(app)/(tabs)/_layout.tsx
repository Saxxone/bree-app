import { Tabs } from "expo-router";
import { Icon, IconifyIcon } from "@iconify/react";
import { useColorScheme } from "react-native";
import { headerDark, headerLight } from "@/styles/main";
import { useMemo } from "react";

export default function TabLayout() {
  const tabBarIcon = useMemo(() => {
    return (icon: IconifyIcon | string) =>
      ({ color, focused }: { color: string; focused: boolean }) => (
        <Icon icon={focused ? icon : icon} color={color} />
      );
  }, []);

  const colorScheme = useColorScheme();
  const header = colorScheme === "dark" ? headerDark : headerLight;
  return (
    <Tabs screenOptions={header}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: tabBarIcon("line-md:home-simple-twotone"),
        }}
      />
      <Tabs.Screen
        name="(explore)"
        options={{
          title: "Explore",
          tabBarIcon: tabBarIcon("line-md:search-twotone"),
        }}
      />
      <Tabs.Screen
        name="(notifications)"
        options={{
          title: "Notifications",
          tabBarIcon: tabBarIcon("line-md:bell-twotone-loop"),
        }}
      />
      <Tabs.Screen
        name="(messages)"
        options={{
          title: "Messages",
          tabBarIcon: tabBarIcon("line-md:chat-bubble-twotone"),
        }}
      />
    </Tabs>
  );
}
