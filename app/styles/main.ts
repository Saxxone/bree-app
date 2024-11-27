import { gray_200, gray_700, gray_800, gray_900, indigo_500, rounded_lg, white } from "@/constants/Colors";
import { ViewStyle, TextStyle, StyleSheet, ImageStyle } from "react-native";

export const container: ViewStyle = {
  flex: 1,
  padding: 16,
};

export const button: TextStyle = {
  fontSize: 20,
  textDecorationLine: "none",
  borderRadius: rounded_lg,
  padding: 10,
  textAlign: "center",
};

export const buttonPrimary: TextStyle = {
  color: white,
  backgroundColor: indigo_500,
};

export const media: ImageStyle = {
  width: "100%",
  height: "100%",
  borderRadius: rounded_lg,
};

export const h1: TextStyle = {
  fontSize: 36,
  fontWeight: "bold",
  marginBottom: 16,
};

export const h2: TextStyle = {
  fontSize: 24,
  fontWeight: "bold",
  marginBottom: 8,
};

export const h3: TextStyle = {
  fontSize: 18,
  fontWeight: "medium",
  marginBottom: 4,
};

export const styles = StyleSheet.create({
  container,
  text: {
    color: gray_200,
  },
  h1,
  h2,
  h3,
  button,
  buttonPrimary,
  image: media,
  video: media,
});

export const headerLight = {
  tabBarActiveTintColor: indigo_500,
  headerStyle: {
    backgroundColor: white,
  },
  headerShadowVisible: false,
  headerTintColor: gray_800,
  tabBarStyle: {
    backgroundColor: white,
  },
};

export const headerDark = {
  tabBarActiveTintColor: indigo_500,
  headerStyle: {
    backgroundColor: gray_800,
  },
  headerShadowVisible: false,
  headerTintColor: white,
  tabBarStyle: {
    backgroundColor: gray_800,
  },
};
