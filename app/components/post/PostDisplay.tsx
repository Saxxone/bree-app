import React, { memo, useMemo, useState } from "react";
import { Post } from "@/types/post";
import { View, useColorScheme } from "react-native";
import AppText from "../app/AppText";
import { DarkStyle, LightStyle } from "@/constants/Theme";
import transformClasses from "@/services/ClassTransformer";
import PostTop from "./PostTop";
import DisplayPostMedia from "./DisplayPostMedia";
import PagerView from "react-native-pager-view";

type Props = {
  readonly post: Post;
};

const PostDisplay = memo(({ post }: Props) => {
  const color_scheme = useColorScheme();
  const bg_color = useMemo(
    () =>
      color_scheme === "dark"
        ? DarkStyle.cardBackgroundColor
        : LightStyle.cardBackgroundColor,
    [color_scheme],
  );
  const [current_page, setCurrentPage] = useState(0);

  return (
    <View
      style={[
        transformClasses("p-3 mb-3 rounded-lg cursor-pointer"),
        { backgroundColor: bg_color.backgroundColor },
      ]}
    >
      <PostTop post={post} />
      {post.type === "SHORT" ? (
        // SHORT POST DISPLAY
        <>
          {post.media.length ? (
            <DisplayPostMedia
              media={post.media}
              mediaTypes={post.mediaTypes}
              postId={post.id}
            />
          ) : null}
          <AppText className="break-word font-normal mt-2">{post.text}</AppText>
        </>
      ) : (
        // LONG POST DISPLAY
        <View style={[transformClasses("h-full")]}>
          <PagerView
            initialPage={0}
            style={[transformClasses("flex-1 h-70")]}
            scrollEnabled={true}
            pageMargin={10}
          >
            {post.longPost?.content?.map((content, index) => {
              return (
                <View
                  style={[transformClasses("px-1")]}
                  key={post.id + "-long-post-" + index}
                >
                  <DisplayPostMedia
                    media={content.media as string[]}
                    mediaTypes={content.mediaTypes as string[]}
                    postId={post.id}
                  />
                  <AppText className="break-word font-normal mt-2">
                    {post.id}
                  </AppText>
                  <AppText className="break-word font-normal mt-2">
                    {content.text}
                  </AppText>
                </View>
              );
            })}
          </PagerView>
          <AppText>{current_page}</AppText>
        </View>
      )}
    </View>
  );
});

export default PostDisplay;
