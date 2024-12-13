import React, { memo, useMemo, useState } from "react";
import { Post } from "@/types/post";
import { View, useColorScheme } from "react-native";
import AppText from "../app/AppText";
import { DarkStyle, LightStyle } from "@/constants/Theme";
import tailwindClasses from "@/services/ClassTransformer";
import PostTop from "./PostTop";
import DisplayPostMedia from "./DisplayPostMedia";
import PagerView from "@/components/app/PagerView";
import { Link } from "expo-router";
import { app_routes } from "@/constants/AppRoutes";
import PostActions from "./PostActions";

type Props = {
  readonly post: Post;
  ellipsis: boolean;
};

const PostDisplay = memo(({ post, ellipsis }: Props) => {
  const color_scheme = useColorScheme();
  const bg_color = useMemo(
    () =>
      color_scheme === "dark"
        ? DarkStyle.cardBackgroundColor
        : LightStyle.cardBackgroundColor,
    [color_scheme],
  );
  const [current_page, setCurrentPage] = useState(0);

  const PageViewIndicator = () => {
    if (!post.longPost?.content || post.longPost.content.length <= 1) {
      return null;
    }

    return (
      <View
        style={tailwindClasses("flex-row items-center justify-center mt-2")}
      >
        {post.longPost.content.map((_, index) => (
          <View
            key={post.id + "-page-indicator-" + index}
            style={[
              tailwindClasses("rounded-full w-1 h-1 mx-1"),
              index === current_page
                ? tailwindClasses("bg-indigo-500")
                : tailwindClasses("bg-gray-300"),
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <Link
      href={app_routes.post.view(post.id)}
      style={[
        tailwindClasses("p-3 mb-3 rounded-lg cursor-pointer"),
        { backgroundColor: bg_color.backgroundColor },
      ]}
    >
      <View style={tailwindClasses("rounded-lg")}>
        <PostTop post={post} />
        {post.type === "SHORT" ? (
          // SHORT POST DISPLAY
          <>
            {post.media.length ? (
              <DisplayPostMedia
                className="mt-2"
                media={post.media}
                mediaTypes={post.mediaTypes}
                postId={post.id}
              />
            ) : null}
            <AppText className="break-word font-normal mt-2">
              {post.text}
            </AppText>
          </>
        ) : (
          // LONG POST DISPLAY
          <PagerView initialPage={0} onPageScroll={(e) => setCurrentPage(e)}>
            {post.longPost?.content?.map((content, index) => {
              return (
                <View
                  style={[tailwindClasses("rounded-md")]}
                  key={post.id + "-long-post-" + index}
                >
                  <DisplayPostMedia
                    className="mt-2"
                    media={content.media as string[]}
                    mediaTypes={content.mediaTypes as string[]}
                    postId={post.id}
                  />

                  {PageViewIndicator()}

                  <AppText
                    className="break-word mt-2 font-light"
                    numberOfLines={ellipsis ? 5 : 0}
                  >
                    {content.text}
                  </AppText>
                </View>
              );
            })}
          </PagerView>
        )}
        <PostActions post={post} />
      </View>
    </Link>
  );
});

export default PostDisplay;
