import PagerView from "@/components/app/PagerView";
import PagerViewIndicator from "@/components/app/PagerViewIndicator";
import Text from "@/components/app/Text";
import { app_routes } from "@/constants/AppRoutes";
import { DarkStyle, LightStyle } from "@/constants/Theme";
import { Post } from "@/types/post";
import { Link } from "expo-router";
import React, { memo, useMemo, useState } from "react";
import { View, useColorScheme } from "react-native";
import tailwindClasses from "@/services/ClassTransformer";
import PostSkeleton from "@/components/skeletons/PostSkeleton";
import DisplayPostMedia from "./DisplayPostMedia";
import PostActions from "./PostActions";
import PostTop from "./PostTop";

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
        tailwindClasses(
          "px-3 pt-3 pb-1 mb-3 rounded-lg min-h-40 cursor-pointer",
        ),
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
            <Text className="break-word font-normal mt-2">
              {String(post.text)}
            </Text>
          </>
        ) : (
          // LONG POST DISPLAY
          <PagerView
            initialPage={0}
            onPageScroll={(e) => setCurrentPage(e)}
            spacing={56}
          >
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

                  <PagerViewIndicator
                    currentPage={currentPage}
                    length={post.longPost?.content?.length as number}
                    ids={post.longPost?.content?.map((c) => c.id) as string[]}
                  />

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
