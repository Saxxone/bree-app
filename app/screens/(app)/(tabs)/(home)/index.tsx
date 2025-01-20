import { useInfiniteQuery } from "@tanstack/react-query";
import { RefreshControl, View, ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import PostDisplay from "@/components/post/PostDisplay";
import { ApiConnectService } from "@/services/ApiConnectService";
import { Post } from "@/types/post";
import Text from "@/components/app/Text";
import { violet_500 } from "@/constants/Colors";
import tailwindClasses from "@/services/ClassTransformer";
import { app_routes } from "@/constants/AppRoutes";
import FloatingActionButton from "@/components/app/FloatingActionButton";
import api_routes from "@/constants/ApiRoutes";
import { FetchMethod } from "@/types/types";
import React from "react";

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
