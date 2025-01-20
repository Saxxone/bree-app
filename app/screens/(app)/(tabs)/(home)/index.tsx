import FloatingActionButton from "@/app-directories/components/app/FloatingActionButton";
import Text from "@/app-directories/components/app/Text";
import PostDisplay from "@/app-directories/components/post/PostDisplay";
import api_routes from "@/app-directories/constants/ApiRoutes";
import { app_routes } from "@/app-directories/constants/AppRoutes";
import { violet_500 } from "@/app-directories/constants/Colors";
import { ApiConnectService } from "@/app-directories/services/ApiConnectService";
import tailwindClasses from "@/app-directories/services/ClassTransformer";
import { Post } from "@/app-directories/types/post";
import { FetchMethod } from "@/app-directories/types/types";
import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, RefreshControl, View } from "react-native";

const POSTS_PER_PAGE = 9;
const ESTIMATED_ITEM_SIZE = 250;

export default function HomeScreen() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["feed"],
    queryFn: async ({ pageParam = 0 }) => {
      return await ApiConnectService<Post[]>({
        url: api_routes.posts.feed,
        method: FetchMethod.POST,
        query: {
          skip: pageParam * POSTS_PER_PAGE,
          take: POSTS_PER_PAGE,
        },
      });
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.data?.length === POSTS_PER_PAGE
        ? pages.length
        : undefined;
    },
    initialPageParam: 0,
  });

  const all_posts = data?.pages.flatMap((page) => page.data) ?? [];

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={tailwindClasses("py-4")}>
        <ActivityIndicator color={violet_500} />
      </View>
    );
  };

  return (
    <>
      <View style={tailwindClasses("container flex-1")}>
        <FlashList
          data={all_posts}
          estimatedItemSize={ESTIMATED_ITEM_SIZE}
          ListEmptyComponent={
            isFetching ? null : (
              <View style={tailwindClasses("p-3 mb-3")}>
                <Text className="text-center text-gray-500">
                  No posts found.
                </Text>
                <Text className="text-center text-gray-500">
                  {all_posts.length}
                </Text>
              </View>
            )
          }
          keyExtractor={(item) => item?.id ?? ""}
          renderItem={({ item }) => (
            <PostDisplay
              key={item?.id}
              post={item}
              ellipsis={true}
              actions={true}
              isFetching={isFetching && !isFetchingNextPage}
            />
          )}
          refreshControl={
            <RefreshControl
              colors={[violet_500]}
              refreshing={isFetching}
              onRefresh={refetch}
            />
          }
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      </View>
      <FloatingActionButton
        to={app_routes.post.compose}
        icon="pencil-outline"
      />
    </>
  );
}
