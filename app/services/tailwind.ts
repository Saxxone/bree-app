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
} from "@/constants/Colors";

const tailwindToRNMap: {
  [key: string]: any;
} = {
  "bg-gray-100": { backgroundColor: gray_100 },
  "bg-gray-200": { backgroundColor: gray_200 },
  "bg-gray-300": { backgroundColor: gray_300 },
  "bg-gray-400": { backgroundColor: gray_400 },
  "bg-gray-500": { backgroundColor: gray_500 },
  "bg-gray-600": { backgroundColor: gray_600 },
  "bg-gray-700": { backgroundColor: gray_700 },
  "bg-gray-800": { backgroundColor: gray_800 },
  "bg-gray-900": { backgroundColor: gray_900 },

  "text-gray-100": { color: gray_100 },
  "text-gray-200": { color: gray_200 },
  // ... other gray text colors
  "text-gray-900": { color: gray_900 },

  "text-white": { color: white },
  "text-violet-400": { color: violet_400 },
  "text-violet-700": { color: violet_700 },

  "font-thin": { fontWeight: "100" },
  "font-extralight": { fontWeight: "200" },
  "font-light": { fontWeight: "300" },
  "font-normal": { fontWeight: "400" },
  "font-medium": { fontWeight: "500" },
  "font-semibold": { fontWeight: "600" },
  "font-bold": { fontWeight: "700" },
  "font-extrabold": { fontWeight: "800" },
  "font-black": { fontWeight: "900" },

  // Font Sizes (adjust px values as needed for your design system)
  "text-xs": { fontSize: 12 },
  "text-sm": { fontSize: 14 },
  "text-base": { fontSize: 16 }, // Default font size
  "text-lg": { fontSize: 18 },
  "text-xl": { fontSize: 20 },
  "text-2xl": { fontSize: 24 },
  "text-3xl": { fontSize: 30 },
  "text-4xl": { fontSize: 36 },
  "text-5xl": { fontSize: 48 },
  // ... and so on

  // Text Alignment
  "text-left": { textAlign: "left" },
  "text-center": { textAlign: "center" },
  "text-right": { textAlign: "right" },
  "text-justify": { textAlign: "justify" }, // May have limited browser support

  // Text Decoration
  underline: { textDecorationLine: "underline" },
  "line-through": { textDecorationLine: "line-through" },
  "no-underline": { textDecorationLine: "none" },

  // Text Transform
  uppercase: { textTransform: "uppercase" },
  lowercase: { textTransform: "lowercase" },
  capitalize: { textTransform: "capitalize" },
  "normal-case": { textTransform: "none" }, // Explicitly set to none

  // Letter Spacing (adjust values as needed)
  "tracking-tight": { letterSpacing: -0.5 }, // Example, adjust as per design
  "tracking-normal": { letterSpacing: 0 }, // Default
  "tracking-wide": { letterSpacing: 0.5 }, // Example, adjust as per design

  // Line Height (adjust values as needed)
  "leading-3": { lineHeight: 12 }, // Example, adjust as per design
  "leading-4": { lineHeight: 16 }, // Example
  "leading-5": { lineHeight: 20 }, // Example
  "leading-6": { lineHeight: 24 }, // Example
  "leading-7": { lineHeight: 28 }, // Example
  "leading-8": { lineHeight: 32 }, // Example

  "rounded-lg": { borderRadius: rounded_lg },
  "rounded-full": { borderRadius: "100%" },

  //flex

  "flex-1": { flex: 1 },
  "flex-auto": { flex: "auto" },
  "flex-initial": { flex: "initial" },
  "flex-none": { flex: 0 },

  "flex-row": { flexDirection: "row" },
  "flex-row-reverse": { flexDirection: "row-reverse" },
  "flex-col": { flexDirection: "column" },
  "flex-col-reverse": { flexDirection: "column-reverse" },

  "flex-wrap": { flexWrap: "wrap" },
  "flex-wrap-reverse": { flexWrap: "wrap-reverse" },
  "flex-nowrap": { flexWrap: "nowrap" },

  "items-start": { alignItems: "flex-start" },
  "items-center": { alignItems: "center" },
  "items-end": { alignItems: "flex-end" },
  "items-stretch": { alignItems: "stretch" },
  "items-baseline": { alignItems: "baseline" },

  "justify-start": { justifyContent: "flex-start" },
  "justify-center": { justifyContent: "center" },
  "justify-end": { justifyContent: "flex-end" },
  "justify-between": { justifyContent: "space-between" },
  "justify-around": { justifyContent: "space-around" },
  "justify-evenly": { justifyContent: "space-evenly" },

  "self-auto": { alignSelf: "auto" },
  "self-start": { alignSelf: "flex-start" },
  "self-center": { alignSelf: "center" },
  "self-end": { alignSelf: "flex-end" },
  "self-stretch": { alignSelf: "stretch" },

  //grid

  grid: { display: "flex", flexWrap: "wrap" },
  "grid-cols-1": { width: "100%" },
  "grid-cols-2": { width: "50%" },
  "grid-cols-3": { width: "33.333333%" },
  "grid-cols-4": { width: "25%" },
  "grid-cols-5": { width: "20%" },
  "grid-cols-6": { width: "16.666667%" },
  "grid-cols-7": { width: "14.285714%" },
  "grid-cols-8": { width: "12.5%" },
  "grid-cols-9": { width: "11.111111%" },
  "grid-cols-10": { width: "10%" },
  "grid-cols-11": { width: "9.090909%" },
  "grid-cols-12": { width: "8.333333%" },

  "grid-rows-1": { height: "100%" },
  "grid-rows-2": { height: "50%" },

  "gap-1": { gap: 4 },
  "gap-2": { gap: 8 },
  "gap-3": { gap: 12 },
  "gap-4": { gap: 16 },
  "gap-5": { gap: 20 },

  //padding
  "p-1": { padding: 4 },
  "p-2": { padding: 8 },
  "p-3": { padding: 12 },
  "p-4": { padding: 16 },
  "p-5": { padding: 20 },

  //margins
  "m-1": { margin: 4 },
  "m-2": { margin: 8 },
  "m-3": { margin: 12 },
  "m-4": { margin: 16 },
  "m-5": { margin: 20 },

  "mt-1": { marginTop: 4 },
  "mb-1": { marginBottom: 4 },
  "ml-1": { marginLeft: 4 },
  "mr-1": { marginRight: 4 },
  "mx-1": { marginHorizontal: 4 },
  "my-1": { marginVertical: 4 },
  "mt-2": { marginTop: 8 },
  "mb-2": { marginBottom: 8 },
  "ml-2": { marginLeft: 8 },
  "mr-2": { marginRight: 8 },
  "mx-2": { marginHorizontal: 8 },
  "my-2": { marginVertical: 8 },
  "mt-3": { marginTop: 12 },
  "mb-3": { marginBottom: 12 },
  "ml-3": { marginLeft: 12 },
  "mr-3": { marginRight: 12 },
  "mx-3": { marginHorizontal: 12 },
  "my-3": { marginVertical: 12 },
  "mt-4": { marginTop: 16 },
  "mb-4": { marginBottom: 16 },
  "ml-4": { marginLeft: 16 },
  "mr-4": { marginRight: 16 },
  "mx-4": { marginHorizontal: 16 },
  "my-4": { marginVertical: 16 },
  "mt-5": { marginTop: 20 },
  "mb-5": { marginBottom: 20 },
  "ml-5": { marginLeft: 20 },
  "mr-5": { marginRight: 20 },
  "mx-5": { marginHorizontal: 20 },
  "my-5": { marginVertical: 20 },
  "mt-auto": { marginTop: "auto" },
  "mb-auto": { marginBottom: "auto" },

  "mr-auto": { marginRight: "auto" },
  "ml-auto": { marginLeft: "auto" },

  // Widths
  "w-0": { width: 0 },
  "w-1": { width: 4 },
  "w-2": { width: 8 },
  "w-3": { width: 12 },
  "w-4": { width: 16 },
  "w-5": { width: 20 },
  "w-6": { width: 24 },
  "w-7": { width: 28 },
  "w-8": { width: 32 },
  "w-9": { width: 36 },
  "w-10": { width: 40 },
  "w-11": { width: 44 },
  "w-12": { width: 48 },
  "w-14": { width: 56 },
  "w-16": { width: 64 },
  "w-20": { width: 80 },
  "w-24": { width: 96 },
  "w-28": { width: 112 },
  "w-32": { width: 128 },
  "w-36": { width: 144 },
  "w-40": { width: 160 },
  "w-44": { width: 176 },
  "w-48": { width: 192 },
  "w-52": { width: 208 },
  "w-56": { width: 224 },
  "w-60": { width: 240 },
  "w-64": { width: 256 },
  "w-72": { width: 288 },
  "w-80": { width: 320 },
  "w-96": { width: 384 },
  "w-px": { width: 1 },
  "w-0.5": { width: 2 },
  "w-1.5": { width: 6 },
  "w-2.5": { width: 10 },
  "w-3.5": { width: 14 },
  // ... and so on for other fractional values

  "w-auto": { width: "auto" },
  "w-full": { width: "100%" },
  "w-screen": { width: "100vw" }, // Full screen width
  "w-min": { width: "min-content" }, // Intrinsic minimum width
  "w-max": { width: "max-content" }, // Intrinsic maximum width
  "w-fit": { width: "fit-content" }, // Shrinks to fit content

  //height

  "h-0": { height: 0 },
  "h-1": { height: 4 },
  "h-2": { height: 8 },
  "h-3": { height: 12 },
  "h-4": { height: 16 },
  "h-5": { height: 20 },
  "h-6": { height: 24 },
  "h-7": { height: 28 },
  "h-8": { height: 32 },
  "h-9": { height: 36 },
  "h-10": { height: 40 },
  "h-11": { height: 44 },
  "h-12": { height: 48 },
  "h-14": { height: 56 },
  "h-16": { height: 64 },
  "h-20": { height: 80 },
  "h-24": { height: 96 },
  "h-28": { height: 112 },
  "h-32": { height: 128 },
  "h-36": { height: 144 },
  "h-40": { height: 160 },
  "h-44": { height: 176 },
  "h-48": { height: 192 },
  "h-52": { height: 208 },
  "h-56": { height: 224 },
  "h-60": { height: 240 },
  "h-64": { height: 256 },
  "h-72": { height: 288 },
  "h-80": { height: 320 },
  "h-96": { height: 384 },
  "h-px": { height: 1 },
  "h-0.5": { height: 2 },
  "h-1.5": { height: 6 },
  "h-2.5": { height: 10 },
  "h-3.5": { height: 14 },
  // ... and so on for other fractional values

  "h-auto": { height: "auto" },
  "h-full": { height: "100%" },
  "h-screen": { height: "100vh" },
  "h-min": { height: "min-content" },
  "h-max": { height: "max-content" },
  "h-fit": { height: "fit-content" },

  //cursor
  "cursor-pointer": { cursor: "pointer" },

  // Object Fit
  "object-contain": { resizeMode: "contain" },
  "object-cover": { resizeMode: "cover" },
  "object-fill": { resizeMode: "stretch" },
  "object-none": { resizeMode: "center" },
  "object-scale-down": { resizeMode: "repeat" },

  // ... Add more Tailwind classes and their React Native style equivalents

  //component class

  //container
  container: {
    width: "100%",
    maxWidth: 300,
    alignSelf: "center",
    paddingHorizontal: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
};

export default tailwindToRNMap;
