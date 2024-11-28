import { Text, useColorScheme, StyleSheet } from "react-native";
import { DarkStyle, LightStyle } from "@/constants/Theme";

export default const AppText = memo(function AppText({style, ...props}): React.FC<React.ComponentProps<typeof Text>> {
  const colorScheme = useColorScheme();
  const textColor =
    colorScheme === "dark" ? DarkStyle.textColor : LightStyle.textColor;
  return <Text style={[styles.default, textColor, style]} {...props} />;
});

const styles = StyleSheet.create({
  default: {
    fontFamily: "Outfit-SemiBold",
    fontSize: 16,
  },
});
