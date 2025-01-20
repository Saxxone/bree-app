import { DarkStyle, LightStyle } from "@/app_directories/constants/Theme";
import { memo, useMemo } from "react";
import {
  Text as AppText,
  StyleSheet,
  TextStyle,
  useColorScheme,
} from "react-native";
import tailwindClasses from "@/app_directories/services/ClassTransformer";

interface Props {
  style?: TextStyle;
  readonly className?: string;
  children?: React.ReactNode;
  numberOfLines?: number;
  onPress?: () => void;
}

const Text = memo(
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
      <AppText
        style={[styles.default, textColor, style, classes]}
        {...props}
        ellipsizeMode="tail"
        numberOfLines={numberOfLines}
        onPress={props.onPress}
      >
        {children}
      </AppText>
    );
  },
);

export default Text;

const styles = StyleSheet.create({
  default: {
    fontFamily: "Outfit Regular",
    fontSize: 15,
  },
});
