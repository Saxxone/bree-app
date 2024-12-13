import { memo, useMemo } from "react";
import { Text, useColorScheme, StyleSheet, TextStyle } from "react-native";
import { DarkStyle, LightStyle } from "@/constants/Theme";
import tailwindClasses from "@/services/ClassTransformer";

interface Props {
  style?: TextStyle;
  readonly className?: string;
  children?: React.ReactNode;
  numberOfLines?: number;
  onPress?: () => void;
}

const AppText = memo(
  ({ style, className, numberOfLines, children, ...props }: Props) => {
    const color_scheme = useColorScheme();
    const textColor = useMemo(
      () =>
        color_scheme === "dark" ? DarkStyle.textColor : LightStyle.textColor,
      [color_scheme],
    );
    const classes = useMemo(
      () => tailwindClasses(className ?? ""),
      [className],
    );

    return (
      <Text
        style={[styles.default, textColor, style, classes]}
        {...props}
        ellipsizeMode="tail"
        numberOfLines={numberOfLines}
        onPress={props.onPress}
      >
        {children}
      </Text>
    );
  },
);

export default AppText;

const styles = StyleSheet.create({
  default: {
    fontFamily: "Outfit Regular",
    fontSize: 15,
  },
});
