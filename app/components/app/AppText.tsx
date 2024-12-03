import { memo, useMemo } from "react";
import { Text, useColorScheme, StyleSheet, TextStyle } from "react-native";
import { DarkStyle, LightStyle } from "@/constants/Theme";

interface Props {
  style?: TextStyle;
  children?: React.ReactNode;
  onPress?: () => void;
}

const AppText = memo(({ style, children, ...props }: Props) => {
  const colorScheme = useColorScheme();
  const textColor = useMemo(
    () => (colorScheme === "dark" ? DarkStyle.textColor : LightStyle.textColor),
    [colorScheme],
  );

  return (
    <Text
      style={[styles.default, textColor, style]}
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
