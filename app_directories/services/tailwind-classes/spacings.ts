const spacings = {
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

  "pr-0.5": { paddingRight: 2 },
  "pl-0.5": { paddingLeft: 2 },
  "pr-1": { paddingRight: 4 },
  "pl-1": { paddingLeft: 4 },
  "pr-2": { paddingRight: 8 },
  "pl-2": { paddingLeft: 8 },
  "pr-3": { paddingRight: 12 },
  "pl-3": { paddingLeft: 12 },
  "pr-4": { paddingRight: 16 },
  "pl-4": { paddingLeft: 16 },
  "pr-5": { paddingRight: 20 },
  "pl-5": { paddingLeft: 20 },

  //vertical padding
  "py-0": { paddingVertical: 0 },
  "py-0.5": { paddingVertical: 2 },
  "py-1": { paddingVertical: 4 },
  "py-2": { paddingVertical: 8 },
  "py-3": { paddingVertical: 12 },
  "py-4": { paddingVertical: 16 },
  "py-5": { paddingVertical: 20 },

  "pt-0": { paddingTop: 0 },
  "pb-0": { paddingBottom: 0 },
  "pt-0.5": { paddingTop: 2 },
  "pb-0.5": { paddingBottom: 2 },
  "pt-1": { paddingTop: 4 },
  "pb-1": { paddingBottom: 4 },
  "pt-2": { paddingTop: 8 },
  "pb-2": { paddingBottom: 8 },
  "pt-3": { paddingTop: 12 },
  "pb-3": { paddingBottom: 12 },
  "pt-4": { paddingTop: 16 },
  "pb-4": { paddingBottom: 16 },
  "pt-5": { paddingTop: 20 },
  "pb-5": { paddingBottom: 20 },

  //margins
  "m-1": { margin: 4 },
  "m-2": { margin: 8 },
  "m-3": { margin: 12 },
  "m-4": { margin: 16 },
  "m-5": { margin: 20 },

  "-mt-3": {
    marginTop: -12,
  },
  "-mb-3": {
    marginBottom: -12,
  },
  "-mx-3": {
    marginHorizontal: -12,
  },
  "-my-3": {
    marginVertical: -12,
  },

  "m-auto": { margin: "auto" },

  "mt-0": { marginTop: 0 },
  "mb-0": { marginBottom: 0 },

  "mt-0.5": { marginTop: 2 },
  "mb-0.5": { marginBottom: 2 },
  "ml-0.5": { marginLeft: 2 },
  "mr-0.5": { marginRight: 2 },
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

  "gap-1": {
    gap: 4,
  },
  "gap-2": {
    gap: 8,
  },
  "gap-3": {
    gap: 12,
  },
  "gap-4": {
    gap: 16,
  },
  "gap-5": {
    gap: 20,
  },
  "gap-6": {
    gap: 24,
  },
  "gap-7": {
    gap: 28,
  },
  "gap-8": {
    gap: 32,
  },
  "gap-9": {
    gap: 36,
  },
  "gap-10": {
    gap: 40,
  },

  "space-1": {
    gap: 4,
  },
  "space-2": {
    gap: 8,
  },
  "space-3": {
    gap: 12,
  },
  "space-4": {
    gap: 16,
  },
  "space-5": {
    gap: 20,
  },
  "space-6": {
    gap: 24,
  },
  "space-7": {
    gap: 28,
  },
  "space-8": {
    gap: 32,
  },
  "space-9": {
    gap: 36,
  },
  "space-10": {
    gap: 40,
  },
  "space-x-1": {
    gapHorizontal: 4,
  },
  "space-x-2": {
    gapHorizontal: 8,
  },
  "space-x-3": {
    gapHorizontal: 12,
  },
  "space-x-4": {
    gapHorizontal: 16,
  },
  "space-x-5": {
    gapHorizontal: 20,
  },
};

export default spacings;
