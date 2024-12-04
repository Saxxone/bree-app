import { memo, useMemo } from "react";
import { Post } from "@/types/post";

import { View, useColorScheme } from "react-native";
import AppText from "../app/AppText";
import { DarkStyle, LightStyle } from "@/constants/Theme";
import createStyles from "@/services/ClassTransformer";
import PostTop from "./PostTop";
import DisplayPostMedia from "./DisplayPostMedia";

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
        createStyles("p-3 mb-3 rounded-lg cursor-pointer"),
        { backgroundColor: bg_color.backgroundColor },
      ]}
    >
      <PostTop post={post} />
      {post.type === "SHORT" ? (
        // SHORT POST DISPLAY
        <>
          <AppText className="break-word font-normal mb-2">{post.text}</AppText>
          {post.media.length ? (
            <DisplayPostMedia
              media={post.media}
              mediaTypes={post.mediaTypes}
              postId={post.id}
            />
          ) : null}
        </>
      ) : (
        // LONG POST DISPLAY
        <>
          {post.longPost?.content?.map((content, index) => {
            return (
              <View key={index}>
                <AppText className="break-word font-normal mb-2">
                  {content.text}
                </AppText>
                <DisplayPostMedia
                  media={content.media as string[]}
                  mediaTypes={content.mediaTypes as string[]}
                  postId={post.id}
                />
              </View>
            );
          })}
        </>
      )}
    </View>
  );
});

export default PostDisplay;
