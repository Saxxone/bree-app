import { useLocalSearchParams } from "expo-router";
import PostDisplay from "@/components/post/PostDisplay";
import { FlatList, RefreshControl, View } from "react-native";
import AppText from "@/components/app/AppText";
import SnackBar from "@/components/app/SnackBar";
import PostSkeleton from "@/components/skeletons/PostSkeleton";
import api_routes from "@/constants/ApiRoutes";
import { violet_500 } from "@/constants/Colors";
import { ApiConnectService } from "@/services/ApiConnectService";
import tailwindClasses from "@/services/ClassTransformer";
import { Post } from "@/types/post";
import { Snack, FetchMethod } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";

export default function PostScreen() {
  const { id } = useLocalSearchParams();

  const skeleton_posts = [1, 2];

  const [snackBar, setSnackBar] = useState<Snack>({
    visible: false,
    title: "Error",
    statusCode: 404,
    type: "error",
    message: "An error occured while fetching feed",
  });

  const {
    isFetching: is_fetching_post,
    isError: is_post_error,
    data: post,
    error: post_error,
    refetch: refetchPost,
  } = useQuery<Post[]>({
    queryKey: ["post"],
    queryFn: async () => {
      return await ApiConnectService<Post[]>({
        url: api_routes.posts.getPostById(id as string),
        method: FetchMethod.GET,
        query: {
          skip: 0,
          take: 10,
        },
      });
    },
    enabled: true,
    retry: false,
  });

  const {
    isFetching: is_fetching_comments,
    isError: is_comments_error,
    data: comments,
    error: comments_error,
    refetch: refetchComments,
  } = useQuery<Post[]>({
    queryKey: ["comments"],
    queryFn: async () => {
      return await ApiConnectService<Post[]>({
        url: api_routes.posts.getComments(id as string),
        method: FetchMethod.GET,
        query: {
          skip: 0,
          take: 10,
        },
      });
    },
    enabled: true,
    retry: false,
  });

  const Post = useMemo(() => {
    if (is_fetching_post && !post?.data) {
      return (
        <View style={tailwindClasses("container")}>
          {skeleton_posts.map((skeleton) => (
            <PostDisplay
              isFetching={is_fetching_post}
              actions={false}
              ellipsis={true}
              post={{} as Post}
              key={"post-skeleton" + skeleton}
            />
          ))}
        </View>
      );
    } else if (is_post_error) {
      return (
        <SnackBar
          snack={snackBar}
          onClose={() => setSnackBar({ ...snackBar, visible: false })}
        />
      );
    } else if (post?.data && post.data.id) {
      return (
        <View style={tailwindClasses("container")}>
          <PostDisplay
            key={post.data.id}
            ellipsis={false}
            actions={true}
            isFetching={is_fetching_post}
            post={post.data}
          />
        </View>
      );
    } else {
      return (
        <View style={[tailwindClasses("p-3 mb-3 ")]}>
          <AppText>Post cannot be displayed.</AppText>
        </View>
      );
    }
  }, [is_fetching_post, is_post_error, post, snackBar, refetchPost]);

  const Comments = useMemo(() => {
    if (is_fetching_comments && !comments?.data) {
      return (
        <View style={tailwindClasses("container")}>
          {skeleton_posts.map((skeleton) => (
            <PostDisplay
              isFetching={is_fetching_comments}
              actions={false}
              ellipsis={true}
              post={{} as Post}
              key={"comment-skeleton" + skeleton}
            />
          ))}
        </View>
      );
    } else if (is_comments_error) {
      return (
        <SnackBar
          snack={snackBar}
          onClose={() => setSnackBar({ ...snackBar, visible: false })}
        />
      );
    } else if (comments?.data && comments.data.length > 0) {
      return (
        <View style={tailwindClasses("container")}>
          <FlatList
            data={comments.data}
            keyExtractor={(post) => post.id}
            renderItem={({ item: post }) => (
              <PostDisplay
                key={post.id}
                actions={false}
                isFetching={is_fetching_comments}
                post={post}
                ellipsis={true}
              />
            )}
            refreshControl={
              <RefreshControl
                colors={[violet_500]}
                refreshing={is_fetching_comments}
                onRefresh={refetchComments}
              />
            }
          />
        </View>
      );
    } else {
      return (
        <View style={[tailwindClasses("px-3 mb-3 ")]}>
          <AppText
            style={tailwindClasses(
              "text-center text-xl font-bold text-gray-500",
            )}
          >
            .
          </AppText>
        </View>
      );
    }
  }, [
    is_fetching_comments,
    is_comments_error,
    comments,
    snackBar,
    refetchComments,
  ]);
  return (
    <>
      {Post}
      <View style={tailwindClasses("mt-4 ml-3")}>{Comments}</View>
    </>
  );
}
