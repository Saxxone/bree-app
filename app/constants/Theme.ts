import { Theme } from "@react-navigation/native";
import { fonts } from "@react-navigation/native/src/theming/fonts";
import { gray_200, gray_700, gray_900, primary, white } from "./Colors";

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: primary,
    background: gray_900,
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
    background: white,
    card: "rgb(18, 18, 18)",
    text: gray_700,
    border: "rgb(39, 39, 41)",
    notification: "rgb(255, 69, 58)",
  },
  fonts,
};
