import Text from "@/components/app/Text";
import PostDisplay from "@/components/post/PostDisplay";
import api_routes from "@/constants/ApiRoutes";
import { useSnackBar } from "@/context/SnackBarProvider";
import { ApiConnectService } from "@/services/ApiConnectService";
import tailwindClasses from "@/services/ClassTransformer";
import { Post } from "@/types/post";
import { FetchMethod } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";

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
    post_error,
    setSnackBar,
  ]);

  return <ScrollView>{Post}</ScrollView>;
}
