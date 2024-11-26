import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { Text } from "react-native";
import { styles } from "@/styles/main";

export default function HomeScreen() {
  const post = {
    id: 1,
  };
  return (
    <ThemedView style={styles.container}>
      <Text style={styles.text}>View Post Feed</Text>
      <Link
        style={styles.text}
        href={{
          pathname: "/screens/(app)/(tabs)/(home)/(post)/[id]",
          params: { id: post.id },
        }}>
        View this Post
      </Link>
    </ThemedView>
  );
}
