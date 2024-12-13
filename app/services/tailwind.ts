import {
  gray_100,
  gray_200,
  gray_900,
  rounded_lg,
  white,
  violet_400,
  violet_700,
  gray_300,
  gray_400,
  gray_500,
  gray_600,
  gray_700,
  gray_800,
  rose_500,
  rose_100,
} from "@/constants/Colors";
import textColors from "@/services/tailwind-classes/textColors";
import backgroundColors from "@/services/tailwind-classes/backgroundColors";
import fontWeights from "@/services/tailwind-classes/fontWeights";
import fontSizes from "./tailwind-classes/fontSizes";
import textDecorations from "./tailwind-classes/textDecorations";
import displays from "./tailwind-classes/displays";
import spacings from "./tailwind-classes/spacings";
import sizes from "./tailwind-classes/sizes";
import positioning from "./tailwind-classes/postioning";
import borders from "./tailwind-classes/borders";
import components from "./tailwind-classes/components";
import objectFit from "./tailwind-classes/objectFit";
import generic from "./tailwind-classes/generic";

/**
 * @fileoverview This file provides a mapping of Tailwind CSS class names to their equivalent React Native style objects.  This allows us to use familiar Tailwind classes within React Native components, abstracting away the underlying style specifics.
 */

const tailwindToRNMap: {
  [key: string]: any;
} = {
  ...textColors,
  ...backgroundColors,
  ...fontWeights,
  ...fontSizes,
  ...textDecorations,
  ...displays,
  ...spacings,
  ...sizes,
  ...positioning,
  ...borders,
  ...components,
  ...objectFit,
  ...generic,
};

export default tailwindToRNMap;
