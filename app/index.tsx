import { Text, View, useColorScheme } from "react-native";
import { Link } from "expo-router";
import { styles } from "@/styles/main";
import { DarkStyle, LightStyle } from "./constants/Theme";

export default function Index() {
  const colorScheme = useColorScheme();
  const textColor =
    colorScheme === "dark" ? DarkStyle.textColor : LightStyle.textColor;

  return (
    <View style={styles.container}>
      <Text style={textColor}>Home screen</Text>
      <Link href="/screens/(auth)/login" style={textColor}>
        Go to Login screen
      </Link>
      <Link href="/screens/(app)/compose" style={textColor}>
        Compose a Post
      </Link>
    </View>
  );
}
