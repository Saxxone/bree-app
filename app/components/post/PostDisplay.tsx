import { memo, useMemo } from "react";
import { Post } from "@/types/post";
import MediaViewer from "@/components/app/MediaViewer";
import { View, Image, useColorScheme } from "react-native";
import AppText from "../app/AppText";
import { violet_400 } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { DarkStyle, LightStyle } from "@/constants/Theme";
import createStyles from "@/services/ClassTransformer";

type Props = {
  readonly post: Post;
};

const PostDisplay = memo(({ post }: Props) => {
  const colorScheme = useColorScheme();
  const bg_color = useMemo(
    () =>
      colorScheme === "dark"
        ? DarkStyle.cardBackgroundColor
        : LightStyle.cardBackgroundColor,
    [colorScheme],
  );

  return (
    <View
      style={[
        createStyles("p-3 mb-3 mx-2 rounded-lg cursor-pointer"),
        { backgroundColor: bg_color.backgroundColor },
      ]}
    >
      <View style={createStyles("flex-row items-start gap-2 mb-2")}>
        <Image
          source={{
            uri: post.author.img as string,
          }}
          style={createStyles("avatar")}
        />
        <View>
          <AppText>{post.author.name}</AppText>
          <AppText>{post.author?.username}</AppText>
        </View>
        <MaterialIcons
          name="verified"
          size={16}
          color={violet_400}
          style={createStyles("mt-1")}
        />
      </View>

      <AppText className="break-word font-normal mb-2">
        {post.text || post.longPost?.content?.[0]?.text}
      </AppText>
      <MediaViewer post={post} />
    </View>
  );
});

export default PostDisplay;
