import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  const post = {
    id: 1,
  };
  return (
    <View style={styles.container}>
      <Text>View Post Feed</Text>
      <Link
        href={{
          pathname: "/screens/(app)/(tabs)/(home)/(post)/[id]",
          params: { id: post.id },
        }}>
        View this Post
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
