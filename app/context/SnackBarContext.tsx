import { Snack } from "@/types/types";
import { createContext } from "react";

interface SnackBarContextType {
  snackBar: Snack;
  setSnackBar: (snack: Snack) => void;
}

const SnackBarContext = createContext<SnackBarContextType | undefined>(
  undefined,
);

export default SnackBarContext;
