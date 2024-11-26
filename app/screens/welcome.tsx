import { Link } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

function WelcomeScreen(props: any) {
  return <Link href="/screens/(auth)/login">Login</Link>;
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
