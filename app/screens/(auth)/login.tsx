import { router } from "expo-router";
import { Text, View } from "react-native";
import { useSession } from "@/ctx";
import { styles } from "@/styles/main";

export default function SignIn() {
  const { signIn } = useSession();
  return (
    <View>
      <Text
        style={styles.text}
        onPress={() => {
          signIn();
          router.replace("/screens/(home)");
        }}>
        Login
      </Text>
    </View>
  );
}
