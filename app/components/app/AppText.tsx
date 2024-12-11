import { memo, useMemo } from "react";
import { Text, useColorScheme, StyleSheet, TextStyle } from "react-native";
import { DarkStyle, LightStyle } from "@/constants/Theme";
import transformClasses from "@/services/ClassTransformer";

interface Props {
  style?: TextStyle;
  className?: string;
  children?: React.ReactNode;
  onPress?: () => void;
}

const AppText = memo(({ style, className, children, ...props }: Props) => {
  const color_scheme = useColorScheme();
  const textColor = useMemo(
    () =>
      color_scheme === "dark" ? DarkStyle.textColor : LightStyle.textColor,
    [color_scheme],
  );
  const classes = useMemo(() => transformClasses(className ?? ""), [className]);

  return (
    <Text
      style={[styles.default, textColor, style, classes]}
      {...props}
      onPress={props.onPress}
    >
      {children}
    </Text>
  );
});

export default AppText;

const styles = StyleSheet.create({
  default: {
    fontFamily: "Outfit-SemiBold",
    fontSize: 16,
  },
});
