import { memo, useMemo } from "react";
import { Post } from "@/types/post";
import MediaViewer from "@/components/app/MediaViewer";
import { Text, View, StyleSheet, Image, useColorScheme } from "react-native";
import AppText from "../app/AppText";
import { rounded_lg, violet_400 } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { DarkStyle, LightStyle } from "@/constants/Theme";

type Props = {
  readonly post: Post;
};

const PostDisplay = memo(({ post }: Props) => {
  const colorScheme = useColorScheme();
  const bgColor = useMemo(
    () =>
      colorScheme === "dark"
        ? DarkStyle.cardBackgroundColor
        : LightStyle.cardBackgroundColor,
    [colorScheme],
  );

  return (
    <View
      style={[styles.wrapper, { backgroundColor: bgColor.backgroundColor }]}
    >
      <View style={styles.flexRow}>
        <Image
          source={{
            uri: post.author.img as string,
          }}
          style={styles.avatar}
        />
        <View>
          <AppText>{post.author.name}</AppText>
          <AppText>{post.author?.username}</AppText>
        </View>
        <MaterialIcons
          name="verified"
          size={16}
          color={violet_400}
          style={{ marginTop: 4 }}
        />
      </View>
      <AppText style={{ marginTop: 8 }}>
        {post.text || post.longPost?.content?.[0]?.text}
      </AppText>
      <MediaViewer post={post} />
    </View>
  );
});

export default PostDisplay;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: rounded_lg,
    padding: 12,
    marginBottom: 8,
    marginHorizontal: 8,
    backgroundColor: "#fff",
    cursor: "pointer",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
});
