import { memo, useMemo } from "react";
import { View } from "react-native";
import tailwindClasses from "@/app-directories/services/ClassTransformer";

interface Props {
  length: number;
  currentPage: number;
  ids?: string[];
  className?: string;
}

const PagerViewIndicator = memo(({ ...props }: Props) => {
  const classes = useMemo(
    () => tailwindClasses(props.className ?? ""),
    [props.className],
  );

  if (!props.length || props.length <= 1) {
    return null;
  }

  const items = Array.from({ length: props.length }, (_, index) => index);

  return (
    <View
      style={[
        tailwindClasses("flex-row items-center justify-center mt-2"),
        classes,
      ]}
    >
      {items.map((num, index) => {
        const k = props.ids ? props.ids[index] : num;
        return (
          <View
            key={k + "-page-indicator-" + index}
            style={[
              tailwindClasses("rounded-full w-1 h-1 mx-1"),
              index === props.currentPage
                ? tailwindClasses("bg-indigo-500")
                : tailwindClasses("bg-gray-300"),
            ]}
          />
        );
      })}
    </View>
  );
});

export default PagerViewIndicator;
