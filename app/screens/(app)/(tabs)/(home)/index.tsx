import PostDisplay from "@/components/post/PostDisplay";
import { RefreshControl, ScrollView, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import api_routes from "@/constants/ApiRoutes";
import { FetchMethod, Snack } from "@/types/types";
import { ApiConnectService } from "@/services/ApiConnectService";
import { Post } from "@/types/post";
import AppText from "@/components/app/AppText";
import { violet_500 } from "@/constants/Colors";
import PostSkeleton from "@/components/skeletons/PostSkeleton";
import createStyles from "@/services/ClassTransformer";
import SnackBar from "@/components/app/SnackBar";
import { useState } from "react";

export default function HomeScreen() {
  const skeleton_posts = [1, 2, 3, 4, 5];
  const [snackBar, setSnackBar] = useState<Snack>({
    visible: false,
    title: "Error",
    statusCode: 404,
    type: "error",
    message: "An error occured while fetching feed",
  });
  const {
    isFetching,
    isError,
    data: feedData,
    error,
    refetch,
  } = useQuery<Post[]>({
    queryKey: ["feed"],
    queryFn: async () => {
      return await ApiConnectService<Post[]>({
        url: api_routes.posts.feed,
        method: FetchMethod.POST,
        query: {
          skip: 0,
          take: 35,
        },
      });
    },
    enabled: true,
    retry: false,
  });

  const Feed =
    isFetching && !feedData?.data ? (
      skeleton_posts.map((skeleton) => (
        <PostSkeleton key={"skeleton" + skeleton} />
      ))
    ) : isError ? (
      <View>
        <SnackBar
          snack={snackBar}
          onClose={() => setSnackBar({ ...snackBar, visible: false })}
        />
      </View>
    ) : feedData.data && feedData.data.length > 0 ? (
      feedData.data.map((post) => <PostDisplay key={post.id} post={post} />)
    ) : (
      <View>
        <AppText>No posts found.</AppText>
      </View>
    );
  return (
    <ScrollView
      style={createStyles("container")}
      refreshControl={
        <RefreshControl
          colors={[violet_500]}
          refreshing={isFetching}
          onRefresh={refetch}
        />
      }
    >
      {Feed}
    </ScrollView>
  );
}
