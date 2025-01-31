import tailwindClasses from "@/app_directories/services/ClassTransformer";
import { Link, Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! This screen doesn't exist." }} />
      <View style={tailwindClasses("container")}>
        <Link href="/(tabs)/home">Go to home screen</Link>
      </View>
    </>
  );
}
