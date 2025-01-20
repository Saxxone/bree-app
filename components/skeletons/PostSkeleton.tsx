import tailwindClasses from "@/services/ClassTransformer";
import { memo, useMemo } from "react";
import { useColorScheme, View } from "react-native";
import { DarkStyle, LightStyle } from "@/constants/Theme";
import SkeletonLoader from "./SkeletonLoader";

const PostSkeleton = memo(() => {
  const random_widths = useMemo(() => {
    const widths = ["w-40", "w-52", "w-full"];
    const shuffledWidths = [...widths];

    for (let i = shuffledWidths.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledWidths[i], shuffledWidths[j]] = [
        shuffledWidths[j],
        shuffledWidths[i],
      ];
    }
    return shuffledWidths.slice(0, 3);
  }, []);
  const color_scheme = useColorScheme();

  const bg_color = useMemo(
    () =>
      color_scheme === "dark"
        ? DarkStyle.cardBackgroundColor
        : LightStyle.cardBackgroundColor,
    [color_scheme],
  );

  return (
    <View
      style={[
        tailwindClasses("block rounded-lg p-3 mb-3 cursor-pointer"),
        { backgroundColor: bg_color.backgroundColor },
      ]}
    >
      <View style={tailwindClasses("flex flex-row items-center gap-4 mb-4")}>
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
            key={w + "skeleton"}
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
