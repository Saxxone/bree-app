const displays = {
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
  "row-span-7": { height: "calc(100% * 7 / var(--grid-rows))" },
  "row-span-8": { height: "calc(100% * 8 / var(--grid-rows))" },
  "row-span-9": { height: "calc(100% * 9 / var(--grid-rows))" },
  "row-span-10": { height: "calc(100% * 10 / var(--grid-rows))" },
  "row-span-11": { height: "calc(100% * 11 / var(--grid-rows))" },
  "row-span-12": { height: "calc(100% * 12 / var(--grid-rows))" },
};

export default displays;
