import { View } from "react-native";
import { Link, router } from "expo-router";
import { styles } from "@/styles/main";
import AppText from "./components/app/AppText";
import { retrieveTokenFromKeychain } from "@/services/ApiConnectService";

export default function Index() {
  //TODO fix this page design and handle auth better
  (async function getAuthStatus() {
    const token = await retrieveTokenFromKeychain();
    if (token) {
      router.replace("/screens/(home)");
    }
  })();

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
