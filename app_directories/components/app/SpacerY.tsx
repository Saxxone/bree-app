import { memo, useMemo } from "react";
import { View } from "react-native";

interface Props {
  readonly size: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
}

const SpacerY = memo(({ size }: Props) => {
  const verticalPadding = () => {
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

  const useVerticalPadding = useMemo(() => verticalPadding(), []);

  return <View style={{ paddingVertical: useVerticalPadding }} />;
});

export default SpacerY;
