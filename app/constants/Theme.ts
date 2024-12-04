import { Theme } from "@react-navigation/native";
import { fonts } from "@react-navigation/native/src/theming/fonts";
import {
  gray_100,
  gray_200,
  gray_400,
  gray_700,
  gray_800,
  gray_900,
  primary,
  white,
} from "./Colors";
import { StyleSheet } from "react-native";

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: primary,
    background: gray_800,
    card: "rgb(18, 18, 18)",
    text: gray_200,
    border: "rgb(39, 39, 41)",
    notification: "rgb(255, 69, 58)",
  },
  fonts,
};

export const LightTheme: Theme = {
  dark: false,
  colors: {
    primary: primary,
    background: gray_200,
    card: "rgb(18, 18, 18)",
    text: gray_700,
    border: "rgb(39, 39, 41)",
    notification: "rgb(255, 69, 58)",
  },
  fonts,
};

export const DarkStyle = StyleSheet.create({
  backgroundColor: {
    backgroundColor: gray_800,
    color: gray_200,
  },
  cardBackgroundColor: {
    backgroundColor: gray_900,
  },
  textColor: {
    color: gray_200,
  },
  mutedTextColor: {
    color: gray_400,
  },
});

export const LightStyle = StyleSheet.create({
  backgroundColor: {
    backgroundColor: gray_100,
  },
  cardBackgroundColor: {
    backgroundColor: white,
  },
  textColor: {
    color: gray_700,
  },
  mutedTextColor: {
    color: gray_400,
  },
});
