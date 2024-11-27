import { Link } from "expo-router";
import React from "react";

function WelcomeScreen(props: any) {
  return <Link href="/screens/(auth)/login">Login</Link>;
}

export default WelcomeScreen;
