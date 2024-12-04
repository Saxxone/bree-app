import { memo, useMemo } from "react";
import SkeletonLoader from "./SkeletonLoader";
import { View, useColorScheme } from "react-native";
import transformClasses from "@/services/ClassTransformer";

import { DarkStyle, LightStyle } from "@/constants/Theme";

const PostSkeleton = memo(() => {
  const widths = ["w-40", "w-52", "w-full"];

  const random_widths = useMemo(() => {
    const shuffledWidths = [...widths];

    for (let i = shuffledWidths.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledWidths[i], shuffledWidths[j]] = [
        shuffledWidths[j],
        shuffledWidths[i],
      ];
    }
    return shuffledWidths.slice(0, 3);
  }, [widths]);
  const colorScheme = useColorScheme();

  const bg_color = useMemo(
    () =>
      colorScheme === "dark"
        ? DarkStyle.cardBackgroundColor
        : LightStyle.cardBackgroundColor,
    [colorScheme],
  );

  return (
    <View
      style={[
        transformClasses("block rounded-lg p-3 mb-3 cursor-pointer"),
        { backgroundColor: bg_color.backgroundColor },
      ]}
    >
      <View style={transformClasses("flex flex-row items-center gap-4 mb-4")}>
        <SkeletonLoader width="w-10" height="h-10" radius="rounded-full" />
        <View>
          <SkeletonLoader
            width="w-52"
            height="h-4"
            radius="rounded-lg"
            className="mb-2"
          />
          <SkeletonLoader width="w-10" height="h-3" radius="rounded-lg" />
        </View>
      </View>
      <View>
        {random_widths.map((w) => (
          <SkeletonLoader
            width={w}
            key={w + Math.random() + "skeleton"}
            height="h-3"
            radius="rounded-lg"
            className="mb-2"
          />
        ))}
      </View>
    </View>
  );
});

export default PostSkeleton;
