import { useLocalSearchParams } from "expo-router";
import { posts } from "@/data/posts";
import PostDisplay from "@/components/post/PostDisplay";
import { ThemedView } from "@/components/ThemedView";

export default function PostScreen() {
  const { id } = useLocalSearchParams();
  const post = posts.find((post) => post.id === id);

  return <ThemedView>{post && <PostDisplay post={post} />}</ThemedView>;
}
