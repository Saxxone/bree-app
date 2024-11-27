import { Text, View } from "react-native";
import { useSession } from "@/ctx";
import { styles } from "@/styles/main";

export default function Index() {
  const { signOut } = useSession();
  return (
    <View style={styles.container}>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}>
        Sign Out
      </Text>
    </View>
  );
}
