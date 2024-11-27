import { posts } from "@/data/posts";
import PostDisplay from "@/components/post/PostDisplay";
import { View } from "react-native";

const Feed = posts.map((post) => {
  return <PostDisplay key={post.id} post={post} />;
});

export default function HomeScreen() {
  return <View>{Feed}</View>;
}
