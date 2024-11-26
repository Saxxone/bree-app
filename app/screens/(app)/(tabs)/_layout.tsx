import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(notifications)"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(explore)"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(messages)"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
