import { router } from "expo-router";
import { Text } from "react-native";
import { useSession } from "@/ctx";
import { ThemedView } from "@/components/ThemedView";
import { styles } from "@/styles/main";

export default function SignIn() {
  const { signIn } = useSession();
  return (
    <ThemedView style={styles.container}>
      <Text
        style={styles.text}
        onPress={() => {
          signIn();
          router.replace("/screens/(home)");
        }}>
        Login
      </Text>
    </ThemedView>
  );
}
