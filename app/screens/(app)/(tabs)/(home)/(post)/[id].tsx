import { useLocalSearchParams } from "expo-router";
import PostDisplay from "@/components/post/PostDisplay";
import { FlatList, RefreshControl, View, ScrollView } from "react-native";
import Text from "@/components/app/Text";
import api_routes from "@/constants/ApiRoutes";
import { violet_500 } from "@/constants/Colors";
import { ApiConnectService } from "@/services/ApiConnectService";
import tailwindClasses from "@/services/ClassTransformer";
import { Post } from "@/types/post";
import { FetchMethod } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSnackBar } from "@/context/SnackBarProvider";

export default function PostScreen() {
  const { id } = useLocalSearchParams();

  const { snackBar, setSnackBar } = useSnackBar();

  const {
    isFetching: is_fetching_post,
    isError: is_post_error,
    error: post_error,
    data: post,
  } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      return await ApiConnectService<Post>({
        url: api_routes.posts.getPostById(id as string),
        method: FetchMethod.GET,
      });
    },
    enabled: true,
    retry: false,
  });

  const {
    isFetching: is_fetching_comments,
    isError: is_comments_error,
    data: comments,
    error: comment_error,
    refetch: refetchComments,
  } = useQuery({
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
    if (is_post_error) {
      setSnackBar({
        ...snackBar,
        visible: true,
        title: "Error",
        type: "error",
        message: post_error.message,
      });
    } else {
      return is_post_error ? (
        <View style={[tailwindClasses("p-3 mb-3 ")]}>
          <Text>Post cannot be displayed.</Text>
        </View>
      ) : (
        <View style={tailwindClasses("container")}>
          <PostDisplay
            key={post?.data?.id}
            ellipsis={false}
            actions={true}
            isFetching={is_fetching_post}
            post={post?.data}
          />
        </View>
      );
    }
  }, [
    is_fetching_post,
    is_post_error,
    post,
    snackBar,
    setSnackBar,
    post_error,
  ]);

  const Comments = useMemo(() => {
    if (is_comments_error) {
      setSnackBar({
        ...snackBar,
        visible: true,
        title: "Error",
        type: "error",
        message: comment_error.message,
      });
    } else {
      return comments?.data && comments?.data?.length > 0 ? (
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
      ) : (
        <View style={[tailwindClasses("px-3 mb-3 ")]}>
          <Text
            style={tailwindClasses(
              "text-center text-xl font-bold text-gray-500",
            )}
          >
            .
          </Text>
        </View>
      );
    }
  }, [
    is_fetching_comments,
    is_comments_error,
    comments,
    snackBar,
    refetchComments,
    comment_error,
    setSnackBar,
  ]);
  return (
    <ScrollView>
      {Post}
      <View style={tailwindClasses("ml-3")}>{Comments}</View>
    </ScrollView>
  );
}
