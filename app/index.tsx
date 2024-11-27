import { Text, View } from "react-native";
import { Link } from "expo-router";
import { styles } from "@/styles/main";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Link href="/screens/(auth)/login" style={styles.button}>
        Go to Login screen
      </Link>
      <Link href="/screens/(app)/compose" style={styles.button}>
        Compose a Post
      </Link>
    </View>
  );
}
