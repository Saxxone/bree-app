import { memo } from "react";
import { StyleSheet, Pressable } from "react-native";
import AppText from "../app/AppText";

import { rounded_lg, primary, white } from "@/constants/Colors";
import tailwindClasses from "@/services/ClassTransformer";

type Props = {
  readonly theme?: "primary";
  readonly onPress?: () => void;
  readonly children: React.ReactNode;
};

const AppButton = memo(({ onPress, theme, children }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        tailwindClasses(
          "w-full py-3 rounded-lg text-center px-4 rounded-lg items-center",
        ),
        { backgroundColor: theme === "primary" ? primary : "transparent" },
      ]}
    >
      <AppText
        style={{
          fontFamily: "Outfit-SemiBold",
          textTransform: "capitalize",
          color: white,
        }}
      >
        {children}
      </AppText>
    </Pressable>
  );
});

export default AppButton;
