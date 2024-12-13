import { StyleSheet } from "react-native";
import tailwindToRNMap from "./tailwind";

/**
 * Transforms a string of Tailwind CSS classes into a React Native stylesheet object.
 *
 * @param {string} className A string of space-separated Tailwind CSS class names.
 * @returns {object} A React Native stylesheet object created using `StyleSheet.create()`.
 */
const tailwindClasses = (className: string): StyleSheet.NamedStyles<object> => {
  let styles = {};
  const classes = className.split(" ");

  classes.forEach((cls) => {
    if (tailwindToRNMap[cls]) {
      styles = { ...styles, ...tailwindToRNMap[cls] };
    }
  });

  return StyleSheet.create(styles);
};

export default tailwindClasses;
