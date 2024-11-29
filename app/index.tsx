import { View } from "react-native";
import { Link } from "expo-router";
import { styles } from "@/styles/main";
import AppText from "./components/app/AppText";

export default function Index() {
  return (
    <View style={styles.container}>
      <AppText>Home screen</AppText>
      <Link href="/screens/(auth)/login" style={styles.button}>
        <AppText>Go to Login screen</AppText>
      </Link>
      <Link href="/screens/(app)/compose" style={styles.button}>
        <AppText>Compose a Post</AppText>
      </Link>
    </View>
  );
}
