import { Text, TextStyle, useColorScheme } from "react-native";
import { DarkStyle, LightStyle } from "@/constants/Theme";

interface Props {
  readonly children?: React.ReactNode;
  readonly style?: TextStyle;
}

export function AppText({ children, style }: Props) {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? DarkStyle.textColor : LightStyle.textColor;
  return <Text style={[textColor, style]}>{children}</Text>;
}
