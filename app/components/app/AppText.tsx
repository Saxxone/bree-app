import { memo } from "react";
import { Text, useColorScheme, StyleSheet } from "react-native";
import { DarkStyle, LightStyle } from "@/constants/Theme";

function AppText({style, ...props}): React.FC<React.ComponentProps<typeof Text>> {
  const colorScheme = useColorScheme();
  const textColor = useMemo(() => colorScheme === "dark" ? DarkStyle.textColor : LightStyle.textColor, [colorScheme]);
  return <Text style={[styles.default, textColor, style]} {...props} />;
};

export default const AppText = memo(AppText)

const styles = StyleSheet.create({
  default: {
    fontFamily: "Outfit-SemiBold",
    fontSize: 16,
  },
});
