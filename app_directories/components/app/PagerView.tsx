import React from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from "react-native";
import tailwindClasses from "@/app_directories/services/ClassTransformer";

interface Props {
  children: React.ReactNode;
  initialPage?: number;
  style?: object[];
  onPageScroll?: (e: number) => void;
  defaultHorizontalScrollIndicator?: boolean;
  spacing: number;
}

const PageView = ({
  children,
  style,
  initialPage = 0,
  spacing,
  defaultHorizontalScrollIndicator,
  onPageScroll,
}: Props) => {
  const { width } = Dimensions.get("window");

  const renderItem = ({ item }: { item: React.ReactNode; index: number }) => {
    return (
      <View
        style={[tailwindClasses("px-1"), style, { width: width - spacing }]}
      >
        {item}
      </View>
    );
  };

  function onScroll(e: NativeSyntheticEvent<NativeScrollEvent>): number | void {
    const screenWidth = Dimensions.get("window").width;
    const currentPage = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
    if (onPageScroll) onPageScroll(currentPage);
  }

  return (
    <FlatList
      data={React.Children.toArray(children)}
      renderItem={renderItem}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={defaultHorizontalScrollIndicator ?? false}
      initialScrollIndex={initialPage}
      onScroll={onScroll}
      keyExtractor={(_, index) => `page-view-${index}`}
    />
  );
};

export default PageView;
