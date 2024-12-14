import { useLocalSearchParams } from "expo-router";
import { posts } from "@/data/posts";
import PostDisplay from "@/components/post/PostDisplay";
import { View } from "react-native";

export default function PostMedia() {
  const { id } = useLocalSearchParams();
  const post = posts.find((post) => post.id === id);

  return (
    <View>
      {post && (
        <PostDisplay
          post={post}
          ellipsis={true}
          actions={false}
          isFetching={false}
        />
      )}
    </View>
  );
}
