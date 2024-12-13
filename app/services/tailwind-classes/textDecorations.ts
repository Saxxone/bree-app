const textDecorations = {
  // Text Alignment
  "text-left": { textAlign: "left" },
  "text-center": { textAlign: "center" },
  "text-right": { textAlign: "right" },
  "text-justify": { textAlign: "justify" },

  // Text Decoration
  underline: { textDecorationLine: "underline" },
  "line-through": { textDecorationLine: "line-through" },
  "no-underline": { textDecorationLine: "none" },

  // Text Transform
  uppercase: { textTransform: "uppercase" },
  lowercase: { textTransform: "lowercase" },
  capitalize: { textTransform: "capitalize" },
  "normal-case": { textTransform: "none" },

  // Letter Spacing (adjust values as needed)
  "tracking-tight": { letterSpacing: -0.5 },
  "tracking-normal": { letterSpacing: 0 },
  "tracking-wide": { letterSpacing: 0.5 },

  // Line Height (adjust values as needed)
  "leading-3": { lineHeight: 12 },
  "leading-4": { lineHeight: 16 },
  "leading-5": { lineHeight: 20 },
  "leading-6": { lineHeight: 24 },
  "leading-7": { lineHeight: 28 },
  "leading-8": { lineHeight: 32 },
};

export default textDecorations;
