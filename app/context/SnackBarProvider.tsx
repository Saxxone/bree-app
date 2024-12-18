import React, { useContext, useState, useMemo } from "react";
import SnackBarContext from "./SnackBarContext";
import { Snack } from "@/types/types";

interface Props {
  children: React.ReactNode;
}

export const SnackBarProvider = ({ children }: Props) => {
  const [snackBar, setSnackBar] = useState<Snack>({
    visible: false,
    title: "",
    message: "",
    type: "error",
  });

  const value = useMemo(() => ({ snackBar, setSnackBar }), [snackBar]);

  return (
    <SnackBarContext.Provider value={value}>
      {children}
    </SnackBarContext.Provider>
  );
};

export const useSnackBar = () => {
  const context = useContext(SnackBarContext);
  if (context === undefined) {
    throw new Error("useSnackBar must be used within a SnackBarProvider");
  }
  return context;
};
