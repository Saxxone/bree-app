import { StyleSheet } from "react-native";
import tailwindToRNMap from "./tailwind";

const transformClasses = (className: string) => {
  let styles = {};
  const classes = className.split(" ");

  classes.forEach((cls) => {
    if (tailwindToRNMap[cls]) {
      styles = { ...styles, ...tailwindToRNMap[cls] };
    }
  });

  return StyleSheet.create(styles);
};

export default transformClasses;
