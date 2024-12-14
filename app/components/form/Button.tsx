import { memo, useMemo } from "react";
import { Pressable } from "react-native";
import Text from "../app/Text";

import { primary, white } from "@/constants/Colors";
import tailwindClasses from "@/services/ClassTransformer";

type Props = {
  readonly theme?: "primary";
  readonly onPress?: () => void;
  readonly children: React.ReactNode;
  readonly disabled?: boolean;
  readonly className?: string;
};

const AppButton = memo(
  ({ onPress, theme, children, className, disabled }: Props) => {
    const classes = useMemo(
      () => tailwindClasses(className ?? ""),
      [className],
    );

    function handleOnPress() {
      if (onPress && !disabled) {
        onPress();
      }
    }
    return (
      <Pressable
        onPress={handleOnPress}
        style={[
          tailwindClasses(
            "py-3 rounded-lg text-center px-4 rounded-lg items-center",
          ),
          { backgroundColor: theme === "primary" ? primary : null },
          classes,
        ]}
      >
        <Text style={tailwindClasses("text-center capitalize")}>
          {children}
        </Text>
      </Pressable>
    );
  },
);

export default AppButton;
