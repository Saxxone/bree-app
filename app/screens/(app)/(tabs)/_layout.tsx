import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="(home)" options={{ title: "Home" }} />
      <Tabs.Screen name="(explore)" options={{ title: "Explore" }} />
      <Tabs.Screen name="(notifications)" options={{ title: "Notifications" }} />
      <Tabs.Screen name="(messages)" options={{ title: "Messages" }} />
    </Tabs>
  );
}
