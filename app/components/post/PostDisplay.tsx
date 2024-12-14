import React, { memo, useMemo, useState } from "react";
import { Post } from "@/types/post";
import { View, useColorScheme } from "react-native";
import Text from "../app/Text";
import { DarkStyle, LightStyle } from "@/constants/Theme";
import tailwindClasses from "@/services/ClassTransformer";
import PostTop from "./PostTop";
import DisplayPostMedia from "./DisplayPostMedia";
import PagerView from "@/components/app/PagerView";
import { Link } from "expo-router";
import { app_routes } from "@/constants/AppRoutes";
import PostActions from "./PostActions";
import PostSkeleton from "../skeletons/PostSkeleton";
import PagerViewIndicator from "../app/PagerViewIndicator";

type Props = {
  readonly post?: Post | null;
  readonly actions: boolean;
  readonly ellipsis: boolean;
  readonly isFetching: boolean;
};

const PostDisplay = memo(({ post, ellipsis, actions, isFetching }: Props) => {
  const color_scheme = useColorScheme();
  const bg_color = useMemo(
    () =>
      color_scheme === "dark"
        ? DarkStyle.cardBackgroundColor
        : LightStyle.cardBackgroundColor,
    [color_scheme],
  );
  const [currentPage, setCurrentPage] = useState(0);

  return !isFetching && post ? (
    <Link
      href={app_routes.post.view(post.id)}
      style={[
        tailwindClasses("px-3 pt-3 pb-2 mb-3 rounded-lg cursor-pointer"),
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
            <Text className="break-word font-normal ">{post.text}</Text>
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

                  <PagerViewIndicator currentPage={currentPage} post={post} />

                  <Text
                    className="break-word mt-2 font-light"
                    numberOfLines={ellipsis ? 5 : 0}
                  >
                    {content.text}
                  </Text>
                </View>
              );
            })}
          </PagerView>
        )}
        {actions && <PostActions post={post} />}
      </View>
    </Link>
  ) : (
    <PostSkeleton />
  );
});

export default PostDisplay;
