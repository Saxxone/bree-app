const sizes = {
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
  "h-4.5": { height: 18 },
  "h-5.5": { height: 22 },
  "h-6.5": { height: 26 },
  "h-7.5": { height: 30 },
  "h-8.5": { height: 34 },
  "h-9.5": { height: 38 },
  "h-10.5": { height: 42 },

  //min heights
  "min-h-72": {
    minHeight: 288,
  },

  //max height
  "max-h-0": {
    maxHeight: 0,
  },
  "max-h-1": {
    maxHeight: 4,
  },
  "max-h-2": {
    maxHeight: 8,
  },
  "max-h-3": {
    maxHeight: 12,
  },
  "max-h-4": {
    maxHeight: 16,
  },
  "max-h-5": {
    maxHeight: 20,
  },
  "max-h-6": {
    maxHeight: 24,
  },
  "max-h-7": {
    maxHeight: 28,
  },
  "max-h-8": {
    maxHeight: 32,
  },
  "max-h-9": {
    maxHeight: 36,
  },
  "max-h-10": {
    maxHeight: 40,
  },
  "max-h-11": {
    maxHeight: 44,
  },
  "max-h-12": {
    maxHeight: 48,
  },
  "max-h-14": {
    maxHeight: 56,
  },
  "max-h-16": {
    maxHeight: 64,
  },
  "max-h-20": {
    maxHeight: 80,
  },
  "max-h-24": {
    maxHeight: 96,
  },
  "max-h-28": {
    maxHeight: 112,
  },
  "max-h-32": {
    maxHeight: 128,
  },
  "max-h-36": {
    maxHeight: 144,
  },
  "max-h-40": {
    maxHeight: 160,
  },
  "max-h-44": {
    maxHeight: 176,
  },
  "max-h-48": {
    maxHeight: 192,
  },
  "max-h-52": {
    maxHeight: 208,
  },
  "max-h-56": {
    maxHeight: 224,
  },
  "max-h-60": {
    maxHeight: 240,
  },
  "max-h-64": {
    maxHeight: 256,
  },
  "max-h-72": {
    maxHeight: 288,
  },
  "max-h-80": {
    maxHeight: 320,
  },
  "max-h-96": {
    maxHeight: 384,
  },

  "max-h-fit": {
    maxHeight: "fit-content",
  },
  "max-h-full": {
    maxHeight: "100%",
  },

  "h-auto": { height: "auto" },
  "h-full": { height: "100%" },
  "h-screen": { height: "100vh" },
  "h-min": { height: "min-content" },
  "h-max": { height: "max-content" },
  "h-fit": { height: "fit-content" },
  "h-inherit": { height: "inherit" },
};

export default sizes;
