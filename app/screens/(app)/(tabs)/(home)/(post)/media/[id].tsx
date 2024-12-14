import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import AppText from "@/components/app/AppText";

export default function PostMedia() {
  // const { id } = useLocalSearchParams();
  // const post = posts.find((post) => post.id === id);

  return (
    <View>
      <AppText>Post</AppText>
    </View>
  );
}
