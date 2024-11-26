import { gray_900 } from "@/constants/Colors";
import { ViewStyle, TextStyle, StyleSheet } from "react-native";

export const container: ViewStyle = {
  flex: 1,
  backgroundColor: gray_900,
  justifyContent: "center",
  alignItems: "center",
};

export const button: TextStyle = {
  fontSize: 20,
  textDecorationLine: "underline",
  color: "#fff",
};

export const styles = StyleSheet.create({
  container,
  text: {
    color: "#fff",
  },
  button,
});
