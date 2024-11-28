import { memo } from 'react';
import { View, StyleSheet } from "react-native";
import { AppText } from "../app/AppText";

import { rounded_lg, primary, white } from "@/constants/Colors";

type Props = {
  readonly theme?: "primary";
  readonly onPress?: () => void;
  readonly children: React.ReactNode;
};

export default const AppButton = memo(function AppButton({ onPress, theme, children }: Props) {
  return (
    <View
      style={[
        styles.buttonContainer,
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
    </View>
  );
});

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: rounded_lg,
  },
});
