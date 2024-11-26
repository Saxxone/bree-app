import { Post } from "@/types/post";
import MediaViewer from "@/components/app/MediaViewer";
import { Text } from "react-native";
import { Link } from "expo-router";
import { styles } from "@/styles/main";

type Props = {
  readonly post: Post;
};

export default function PostDisplay({ post }: Props) {
  return (
    <Link
      style={styles.text}
      href={{
        pathname: "/screens/(app)/(tabs)/(home)/(post)/[id]",
        params: { id: post.id },
      }}>
      <MediaViewer post={post} />
      <Text>{post.text}</Text>
    </Link>
  );
}
