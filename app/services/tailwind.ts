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

/**
 * @fileoverview This file provides a mapping of Tailwind CSS class names to their equivalent React Native style objects.  This allows us to use familiar Tailwind classes within React Native components, abstracting away the underlying style specifics.
 */

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

  "bg-violet-400": { backgroundColor: violet_400 },
  "bg-violet-700": { backgroundColor: violet_700 },

  "bg-rose-100": { backgroundColor: rose_100 },
  "bg-rose-500": { backgroundColor: rose_500 },

  "bg-white": { backgroundColor: white },

  "text-gray-100": { color: gray_100 },
  "text-gray-200": { color: gray_200 },
  "text-gray-300": { color: gray_300 },
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

  //displays

  block: { display: "block" },
  inline: { display: "inline" },
  "inline-block": { display: "inline-block" },
  flex: { display: "flex" },
  "inline-flex": { display: "inline-flex" },

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

  grid: { display: "flex" },
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
  "grid-rows-2": { height: "48%" },
  "grid-rows-3": { height: "33.333333%" },
  "grid-rows-4": { height: "25%" },
  "grid-rows-5": { height: "20%" },
  "grid-rows-6": { height: "16.666667%" },
  "grid-rows-7": { height: "14.285714%" },
  "grid-rows-8": { height: "12.5%" },
  "grid-rows-9": { height: "11.111111%" },
  "grid-rows-10": { height: "10%" },
  "grid-rows-11": { height: "9.090909%" },
  "grid-rows-12": { height: "8.333333%" },

  "row-span-1": { height: "auto" }, // Default behavior
  "row-span-2": { height: "calc(100% * 2)" },
  "row-span-3": { height: "calc(100% * 3 / var(--grid-rows))" },
  "row-span-4": { height: "calc(100% * 4 / var(--grid-rows))" },
  "row-span-5": { height: "calc(100% * 5 / var(--grid-rows))" },
  "row-span-6": { height: "calc(100% * 6 / var(--grid-rows))" },

  // ... and so on for other row-span values

  "gap-0": { gap: 0 },

  "gap-1": { gap: 4 },
  "gap-2": { gap: 8 },
  "gap-3": { gap: 12 },
  "gap-4": { gap: 16 },
  "gap-5": { gap: 20 },

  //padding
  "p-0": { padding: 0 },
  "p-0.5": { padding: 2 },
  "p-1": { padding: 4 },
  "p-2": { padding: 8 },
  "p-3": { padding: 12 },
  "p-4": { padding: 16 },
  "p-5": { padding: 20 },
  "p-6": { padding: 24 },
  "p-7": { padding: 28 },
  "p-8": { padding: 32 },
  "p-9": { padding: 36 },
  "p-10": { padding: 40 },

  "p-11": { padding: 44 },
  "p-12": { padding: 48 },
  "p-14": { padding: 56 },
  "p-16": { padding: 64 },
  "p-20": { padding: 80 },
  "p-24": { padding: 96 },

  //horizontal padding
  "px-0": { paddingHorizontal: 0 },
  "px-0.5": { paddingHorizontal: 2 },
  "px-1": { paddingHorizontal: 4 },
  "px-2": { paddingHorizontal: 8 },
  "px-3": { paddingHorizontal: 12 },
  "px-4": { paddingHorizontal: 16 },
  "px-5": { paddingHorizontal: 20 },

  //vertical padding
  "py-0": { paddingVertical: 0 },
  "py-0.5": { paddingVertical: 2 },
  "py-1": { paddingVertical: 4 },
  "py-2": { paddingVertical: 8 },
  "py-3": { paddingVertical: 12 },
  "py-4": { paddingVertical: 16 },
  "py-5": { paddingVertical: 20 },

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

  // heights

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
  "h-inherit": { height: "inherit" },

  //postioning
  absolute: { position: "absolute" },
  fixed: { position: "fixed" },
  relative: { position: "relative" },
  "top-0": { top: 0 },
  "bottom-0": { bottom: 0 },
  "left-0": { left: 0 },
  "right-0": { right: 0 },
  "top-1": { top: 4 },
  "bottom-1": { bottom: 4 },
  "left-1": { left: 4 },
  "right-1": { right: 4 },
  "top-2": { top: 8 },
  "bottom-2": { bottom: 8 },
  "left-2": { left: 8 },
  "right-2": { right: 8 },
  "top-3": { top: 12 },
  "bottom-3": { bottom: 12 },
  "left-3": { left: 12 },
  "right-3": { right: 12 },
  "top-4": { top: 16 },
  "bottom-4": { bottom: 16 },
  "left-4": { left: 16 },
  "right-4": { right: 16 },
  "top-5": { top: 20 },
  "bottom-5": { bottom: 20 },
  "left-5": { left: 20 },
  "right-5": { right: 20 },

  //cursor
  "cursor-pointer": { cursor: "pointer" },

  //border and border colors
  border: { borderWidth: 1, borderStyle: "solid" },
  "border-b": { borderBottomWidth: 1, borderBottomStyle: "solid" },
  "border-t": { borderTopWidth: 1, borderTopStyle: "solid" },
  "border-l": { borderLeftWidth: 1, borderLeftStyle: "solid" },
  "border-r": { borderRightWidth: 1, borderRightStyle: "solid" },
  "border-transparent": { borderColor: "transparent" },
  "border-ttransparent": { borderTopColor: "transparent" },
  "border-btransparent": { borderBottomColor: "transparent" },
  "border-ltransparent": { borderLeftColor: "transparent" },
  "border-rtransparent": { borderRightColor: "transparent" },

  "border-gray-100": { borderColor: gray_100 },
  "border-gray-200": { borderColor: gray_200 },
  "border-gray-300": { borderColor: gray_300 },
  "border-gray-400": { borderColor: gray_400 },
  "border-gray-500": { borderColor: gray_500 },
  "border-gray-600": { borderColor: gray_600 },
  "border-gray-700": { borderColor: gray_700 },
  "border-gray-800": { borderColor: gray_800 },
  "border-gray-900": { borderColor: gray_900 },
  "border-white": { borderColor: white },
  "border-violet-400": { borderColor: violet_400 },
  "border-violet-700": { borderColor: violet_700 },

  //rose border
  "border-rose-100": { borderColor: rose_100 },
  "border-rose-500": { borderColor: rose_500 },

  // Object Fit
  "object-contain": { resizeMode: "contain" },
  "object-cover": { resizeMode: "cover" },
  "object-fill": { resizeMode: "stretch" },
  "object-none": { resizeMode: "center" },
  "object-scale-down": { resizeMode: "repeat" },

  //overflow
  "overflow-visible": { overflow: "visible" },
  "overflow-hidden": { overflow: "hidden" },
  "overflow-scroll": { overflow: "scroll" },
  "overflow-auto": { overflow: "auto" },
  "overflow-x-hidden": { overflowX: "hidden" },
  "overflow-y-hidden": { overflowY: "hidden" },
  "overflow-x-scroll": { overflowX: "scroll" },
  "overflow-y-scroll": { overflowY: "scroll" },
  "overflow-x-auto": { overflowX: "auto" },
  "overflow-y-auto": { overflowY: "auto" },

  // ... Add more Tailwind classes and their React Native style equivalents

  //component class

  //container
  container: {
    width: "100%",
    maxWidth: "100vw",
    paddingHorizontal: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
};

export default tailwindToRNMap;
