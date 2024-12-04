import { posts } from "@/data/posts";
import PostDisplay from "@/components/post/PostDisplay";
import { RefreshControl, ScrollView, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import api_routes from "@/constants/ApiRoutes";
import { FetchMethod } from "@/types/types";
import { ApiConnectService } from "@/services/ApiConnectService";
import { Post } from "@/types/post";
import AppText from "@/components/app/AppText";
import { violet_500 } from "@/constants/Colors";

export default function HomeScreen() {
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

  const Feed = isFetching ? (
    <AppText>Loading...</AppText>
  ) : isError ? (
    <View>
      <AppText>Error: {error?.message}</AppText>
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
