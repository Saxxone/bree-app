import tailwindClasses from "@/services/ClassTransformer";
import { Post } from "@/types/post";
import { memo } from "react";
import { View } from "react-native";

interface Props {
  post: Post;
  currentPage: number;
}

const PagerViewIndicator = memo(({ ...props }: Props) => {
  if (
    !props.post.longPost?.content ||
    props.post.longPost.content.length <= 1
  ) {
    return null;
  }

  return (
    <View style={tailwindClasses("flex-row items-center justify-center mt-2")}>
      {props.post.longPost.content.map((_, index) => (
        <View
          key={props.post.id + "-page-indicator-" + index}
          style={[
            tailwindClasses("rounded-full w-1 h-1 mx-1"),
            index === props.currentPage
              ? tailwindClasses("bg-indigo-500")
              : tailwindClasses("bg-gray-300"),
          ]}
        />
      ))}
    </View>
  );
});

export default PagerViewIndicator;
