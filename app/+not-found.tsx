import { Link, Stack } from "expo-router";
import React from "react";
import { View } from "react-native";
import tailwindClasses from "../services/ClassTransformer";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! This screen doesn't exist." }} />
      <View style={tailwindClasses("container")}>
        <Link href="/screens/(app)/(tabs)/home">Go to home screen</Link>
      </View>
    </>
  );
}
