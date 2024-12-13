import React, { useState } from "react";
import {
  View,
  FlatList,
  Dimensions,
  ViewStyle,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

interface Props {
  children: React.ReactNode;
  initialPage?: number;
  style?: object[];
  onPageScroll?: (e: number) => void;
  defaultHorizontalScrollIndicator?: boolean;
}

const PageView = ({
  children,
  initialPage = 0,
  style,
  defaultHorizontalScrollIndicator,
  onPageScroll,
}: Props) => {
  const { width } = Dimensions.get("window");

  const renderItem = ({ item }: { item: React.ReactNode; index: number }) => {
    return <View style={{ width: width - 40, flex: 1 }}>{item}</View>;
  };

  function onScroll(e: NativeSyntheticEvent<NativeScrollEvent>): number | void {
    const screenWidth = Dimensions.get("window").width;
    const currentPage = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
    if (onPageScroll) onPageScroll(currentPage);
  }

  return (
    <View style={style}>
      <FlatList
        data={React.Children.toArray(children)}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={defaultHorizontalScrollIndicator}
        initialScrollIndex={initialPage}
        onScroll={onScroll}
        keyExtractor={(_, index) => `page-view-${index}`}
      />
    </View>
  );
};

export default PageView;
