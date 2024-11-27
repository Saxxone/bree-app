import { gray_900, rounded_lg } from "@/constants/Colors";
import { ViewStyle, TextStyle, StyleSheet, ImageStyle } from "react-native";

export const container: ViewStyle = {
  flex: 1,
  // backgroundColor: gray_900,
  padding: 16,
};

export const button: TextStyle = {
  fontSize: 20,
  textDecorationLine: "underline",
  color: "#fff",
};

export const media: ImageStyle = {
  width: "100%",
  height: "100%",
  borderRadius: rounded_lg,
};

export const styles = StyleSheet.create({
  container,
  text: {
    color: "#fff",
  },
  button,
  image: media,
  video: media,
});
