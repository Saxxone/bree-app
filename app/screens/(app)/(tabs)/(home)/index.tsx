import { ThemedView } from "@/components/ThemedView";
import { styles } from "@/styles/main";
import { posts } from "@/data/posts";
import PostDisplay from "@/components/post/PostDisplay";

const Feed = posts.map((post) => {
  return <PostDisplay key={post.id} post={post} />;
});

export default function HomeScreen() {
  return <ThemedView style={styles.container}>{Feed}</ThemedView>;
}
