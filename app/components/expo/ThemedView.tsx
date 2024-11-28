import { View, type ViewProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );
  const height = StyleSheet.create({
    innerHeight: {
      height: "100%",
    },
    maxHeight: {
      maxHeight: "100%",
    },
  });

  return (
    <View
      style={[{ backgroundColor }, height.innerHeight, style]}
      {...otherProps}
    />
  );
}
