import { memo } from "react";
import { Pressable } from "react-native";
import Text from "../app/Text";

import { primary, white } from "@/constants/Colors";
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
      <Text
        style={{
          fontFamily: "Outfit-SemiBold",
          textTransform: "capitalize",
          color: white,
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
});

export default AppButton;
