import { memo, useMemo } from "react";
import { View } from "react-native";

interface Props {
  readonly size: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
}

const SpacerX = memo(({ size }: Props) => {
  const horizontalPadding = () => {
    switch (size) {
      case "xxs":
        return 8;
      case "xs":
        return 16;
      case "sm":
        return 24;
      case "md":
        return 32;
      case "lg":
        return 48;
      case "xl":
        return 64;
      case "xxl":
        return 96;
      default:
        return 16;
    }
  };

  const useHorizontalPadding = useMemo(() => horizontalPadding(), []);

  return <View style={{ paddingHorizontal: useHorizontalPadding }} />;
});

export default SpacerX;
