import { Text, useColorScheme, StyleSheet } from "react-native";
import { DarkStyle, LightStyle } from "@/constants/Theme";

export const AppText: React.FC<React.ComponentProps<typeof Text>> = ({
  style,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const textColor =
    colorScheme === "dark" ? DarkStyle.textColor : LightStyle.textColor;
  return <Text style={[styles.default, textColor, style]} {...props} />;
};

const styles = StyleSheet.create({
  default: {
    fontFamily: "Outfit-SemiBold",
    fontSize: 16,
  },
});
