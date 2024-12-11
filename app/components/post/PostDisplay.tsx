import React, { memo, useMemo, useState } from "react";
import { Post } from "@/types/post";
import { View, useColorScheme } from "react-native";
import AppText from "../app/AppText";
import { DarkStyle, LightStyle } from "@/constants/Theme";
import transformClasses from "@/services/ClassTransformer";
import PostTop from "./PostTop";
import DisplayPostMedia from "./DisplayPostMedia";
import PagerView, { PagerViewOnPageScrollEvent } from "react-native-pager-view";
import { violet_400 } from "@/constants/Colors";

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

  const renderPageIndicator = () => {
    if (!post.longPost?.content || post.longPost.content.length <= 1) {
      return null; // Don't render if not a long post or only one page
    }

    return (
      <View
        style={transformClasses("flex-row items-center justify-center mt-2")}
      >
        {post.longPost.content.map((_, index) => (
          <View
            key={post.id + "-page-indicator-" + index}
            style={[
              transformClasses("rounded-full w-1 h-1 mx-1"),
              index === current_page
                ? transformClasses("bg-violet-400")
                : transformClasses("bg-gray-300"),
            ]}
          />
        ))}
      </View>
    );
  };

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
        <View style={[transformClasses("h-72")]}>
          <PagerView
            initialPage={0}
            style={[transformClasses("flex-1 h-72")]}
            scrollEnabled={true}
            pageMargin={10}
            onPageScroll={(e: PagerViewOnPageScrollEvent) =>
              setCurrentPage(e.nativeEvent.position)
            }
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
                  {renderPageIndicator()}
                  <AppText className="break-word font-normal mt-2">
                    {content.text}
                  </AppText>
                </View>
              );
            })}
          </PagerView>
        </View>
      )}
    </View>
  );
});

export default PostDisplay;
