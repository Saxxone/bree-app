import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { header } from "@/styles/main";

const tabBarIcon =
  (name: string) =>
  ({ color, focused }: { color: string; focused: boolean }) =>
    <Ionicons name={focused ? `${name}-sharp` : `${name}-outline`} color={color} size={24} />;

export default function TabLayout() {
  return (
    <Tabs screenOptions={header}>
      <Tabs.Screen name="(home)" options={{ title: "Home", tabBarIcon: tabBarIcon("home") }} />
      <Tabs.Screen name="(explore)" options={{ title: "Explore", tabBarIcon: tabBarIcon("search") }} />
      <Tabs.Screen
        name="(notifications)"
        options={{
          title: "Notifications",
          tabBarIcon: tabBarIcon("notifications"),
        }}
      />
      <Tabs.Screen name="(messages)" options={{ title: "Messages", tabBarIcon: tabBarIcon("chatbubbles") }} />
    </Tabs>
  );
}
