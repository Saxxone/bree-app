import PostDisplay from "@/components/post/PostDisplay";
import { FlatList, RefreshControl, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import api_routes from "@/constants/ApiRoutes";
import { FetchMethod } from "@/types/types";
import { ApiConnectService } from "@/services/ApiConnectService";
import { Post } from "@/types/post";
import Text from "@/components/app/Text";
import { violet_500 } from "@/constants/Colors";
import tailwindClasses from "@/services/ClassTransformer";
import { useMemo } from "react";
import { app_routes } from "@/constants/AppRoutes";
import FloatingActionButton from "@/components/app/FloatingActionButton";
import { useSnackBar } from "@/context/SnackBarProvider";

export default function HomeScreen() {
  const { snackBar, setSnackBar } = useSnackBar();

  const { isFetching, isError, data, refetch, error } = useQuery({
    queryKey: ["feed"],
    queryFn: async () => {
      return await ApiConnectService<Post[]>({
        url: api_routes.posts.feed,
        method: FetchMethod.POST,
        query: {
          skip: 0,
          take: 9,
        },
      });
    },
    enabled: true,
    retry: false,
  });

  const Feed = useMemo(() => {
    if (isError) {
      return setSnackBar({
        ...snackBar,
        visible: true,
        title: "Error",
        type: "error",
        message: error.message,
      });
    } else {
      return isError ? (
        <View style={[tailwindClasses("p-3 mb-3 ")]}>
          <Text className="text-center text-gray-500">No posts found.</Text>
        </View>
      ) : (
        <View style={tailwindClasses("container")}>
          <FlatList
            data={data?.data}
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
      );
    }
  }, [isFetching, isError, data, snackBar, refetch]);
  return (
    <>
      {Feed}
      <FloatingActionButton
        to={app_routes.post.compose}
        icon="pencil-outline"
      />
    </>
  );
}
