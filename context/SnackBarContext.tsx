import { createContext } from "react";
import { Snack } from "../types/types";

interface SnackBarContextType {
  snackBar: Snack;
  setSnackBar: (snack: Snack) => void;
}

const SnackBarContext = createContext<SnackBarContextType | undefined>(
  undefined,
);

export default SnackBarContext;
