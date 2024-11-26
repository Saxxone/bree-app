import { Link, Stack } from "expo-router";
import { View } from "react-native";
import { styles } from "@/styles/main";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! This screen doesn't exist." }} />
      <View style={styles.container}>
        <Link href="/screens/(app)/(tabs)/home">Go to home screen</Link>
      </View>
    </>
  );
}
