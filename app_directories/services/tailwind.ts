import backgroundColors from "./tailwind-classes/backgroundColors";
import borders from "./tailwind-classes/borders";
import components from "./tailwind-classes/components";
import displays from "./tailwind-classes/displays";
import fontSizes from "./tailwind-classes/fontSizes";
import fontWeights from "./tailwind-classes/fontWeights";
import generic from "./tailwind-classes/generic";
import objectFit from "./tailwind-classes/objectFit";
import positioning from "./tailwind-classes/postioning";
import sizes from "./tailwind-classes/sizes";
import spacings from "./tailwind-classes/spacings";
import textColors from "./tailwind-classes/textColors";
import textDecorations from "./tailwind-classes/textDecorations";

/**
 * @fileoverview This file provides a mapping of Tailwind CSS class names to their equivalent React Native style objects.  This allows us to use familiar Tailwind classes within React Native components, abstracting away the underlying style specifics.
 */

const tailwind_to_RN_map = {
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

export default tailwind_to_RN_map;
