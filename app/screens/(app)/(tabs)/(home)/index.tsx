import PostDisplay from "@/components/post/PostDisplay";
import { FlatList, RefreshControl, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import api_routes from "@/constants/ApiRoutes";
import { FetchMethod, Snack } from "@/types/types";
import { ApiConnectService } from "@/services/ApiConnectService";
import { Post } from "@/types/post";
import AppText from "@/components/app/AppText";
import { violet_500 } from "@/constants/Colors";
import tailwindClasses from "@/services/ClassTransformer";
import SnackBar from "@/components/app/SnackBar";
import { useMemo, useState } from "react";

export default function HomeScreen() {
  const [snackBar, setSnackBar] = useState<Snack>({
    visible: false,
    title: "Error",
    type: "error",
    message: "An error occured while fetching feed",
  });
  const { isFetching, isError, data, refetch } = useQuery({
    queryKey: ["feed"],
    queryFn: async () => {
      return await ApiConnectService<Post[]>({
        url: api_routes.posts.feed,
        method: FetchMethod.POST,
        query: {
          skip: 0,
          take: 40,
        },
      });
    },
    enabled: true,
    retry: false,
  });

  const Feed = useMemo(() => {
    if (isError) {
      return (
        <SnackBar
          snack={snackBar}
          onClose={() => setSnackBar({ ...snackBar, visible: false })}
        />
      );
    } else {
      return data?.data && data.data.length > 0 ? (
        <View style={tailwindClasses("container")}>
          <FlatList
            data={data.data}
            keyExtractor={(post) => post.id}
            renderItem={({ item: post }) => (
              <PostDisplay
                key={post.id}
                post={post}
                ellipsis={true}
                actions={true}
                isFetching={isFetching}
              />
            )}
            refreshControl={
              <RefreshControl
                colors={[violet_500]}
                refreshing={isFetching}
                onRefresh={refetch}
              />
            }
          />
        </View>
      ) : (
        <View style={[tailwindClasses("p-3 mb-3 ")]}>
          <AppText>No posts found.</AppText>
        </View>
      );
    }
  }, [isFetching, isError, data, snackBar, refetch]);
  return <>{Feed}</>;
}
