import { StyleSheet } from "react-native";
import tailwind_to_RN_map from "./tailwind";

/**
 * Transforms a string of Tailwind CSS classes into a React Native stylesheet object.
 *
 * @param {string} className A string of space-separated Tailwind CSS class names.
 * @returns {object} A React Native stylesheet object created using `StyleSheet.create()`.
 */

type ClassKeys = keyof typeof tailwind_to_RN_map;


type Join<K, P> = K extends string | number ? P extends string | number ? `${K} ${P}` : never : never;

type Combinations<T extends string, U extends string = T, Depth extends number = 3> = 
  Depth extends 0 ? never : T extends any ? T | Join<T, Combinations<Exclude<U, T>, Exclude<U, T>, Decrement<Depth>>> : never;

type Decrement<N extends number> =  
  N extends 1 ? 0 : never;

type SpaceSeparatedKeys = Combinations<ClassKeys>;


const tailwindClasses = (class_name: SpaceSeparatedKeys): StyleSheet.NamedStyles<object> => {
  let styles = {};
  const classes = class_name.split(" ");

  classes.forEach((cls) => {
    if (tailwind_to_RN_map[cls]) {
      styles = { ...styles, ...tailwind_to_RN_map[cls] };
    }
  });

  return StyleSheet.create(styles);
};

export default tailwindClasses;
