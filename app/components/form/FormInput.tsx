import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { ValidationRule, useValidation } from "@/hooks/useValidation";
import { LightStyle, DarkStyle } from "@/constants/Theme";
import {
  TextInput,
  Pressable,
  StyleSheet,
  useColorScheme,
  View,
  GestureResponderEvent,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import AppText from "@/components/app/AppText";
import { gray_900, red_400, rounded_lg, white } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import transformClasses from "@/services/ClassTransformer";

type IconNames =
  | "lock-closed-outline"
  | "person-outline"
  | "eye-outline"
  | "eye-off-outline";

interface Props extends Omit<TextInputProps, "style"> {
  readonly value: string;
  readonly label?: string;
  readonly placeholder: string;
  readonly secureTextEntry?: boolean;
  readonly prependIcon?: IconNames;
  readonly appendIcon?: IconNames;
  readonly validationRules?: ValidationRule[];
  readonly autoComplete?: "email" | "password" | "username";
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  readonly onChangeText: (text: string) => void;
  readonly onPrependPressed?: (event: GestureResponderEvent) => void;
  readonly onAppendPressed?: (event: GestureResponderEvent) => void;
  onValidationError?: (errors: Record<string, string> | null) => void;
}

const FormInput = memo(
  ({
    label,
    value,
    placeholder,
    secureTextEntry,
    prependIcon,
    appendIcon,
    style,
    inputStyle,
    autoComplete,
    validationRules,
    onPrependPressed,
    onAppendPressed,
    onChangeText,
    onValidationError,
    ...otherTextInputProps
  }: Props) => {
    const colorScheme = useColorScheme();

    const textColor = useMemo(
      () =>
        colorScheme === "dark" ? DarkStyle.textColor : LightStyle.textColor,
      [colorScheme],
    );

    const mutedTextColor = useMemo(
      () =>
        colorScheme === "dark"
          ? DarkStyle.mutedTextColor.color
          : LightStyle.mutedTextColor.color,
      [colorScheme],
    );

    const backgroundColor = useMemo(
      () => (colorScheme === "dark" ? gray_900 : white),
      [colorScheme],
    );

    const [isInputValid, setIsInputValid] = useState({});

    const { validate, errors, setErrors } = useValidation();

    const validateForm = useCallback(() => {
      if (!validationRules) return;

      const newErrors = validate(value, validationRules);

      setErrors(newErrors);

      setIsInputValid(Object.keys(newErrors).length === 0);

      if (onValidationError) {
        onValidationError(Object.keys(newErrors).length > 0 ? newErrors : null);
      }
    }, [value, validationRules, onValidationError, validate, setErrors]);

    const memoPrependIcon = useMemo(() => {
      if (!prependIcon) return null;

      return (
        <Pressable
          onPress={onPrependPressed}
          style={transformClasses("m-0 px-0.5")}
        >
          <Ionicons name={prependIcon} size={18} color={textColor.color} />
        </Pressable>
      );
    }, [prependIcon, textColor]);

    const memoAppendIcon = useMemo(() => {
      if (!appendIcon) return null;

      return (
        <Pressable
          onPress={onAppendPressed}
          style={transformClasses("m-0 px-0.5")}
        >
          <Ionicons name={appendIcon} size={18} color={textColor.color} />
        </Pressable>
      );
    }, [appendIcon, textColor]);

    return (
      <View style={transformClasses("mb-4")}>
        {label ? <AppText>{label}</AppText> : null}

        <View
          style={[
            transformClasses(
              "px-4 border border-transparent rounded-lg w-full flex flex-wrap items-center gap-8",
            ),
            isInputValid ? null : transformClasses("border-rose-500 border"),
            { backgroundColor: backgroundColor },
          ]}
        >
          {prependIcon ? memoPrependIcon : null}
          <TextInput
            placeholder={placeholder}
            style={[
              styles.input,
              transformClasses("flex-1 border-transparent"),
              textColor,
              { backgroundColor: backgroundColor },
            ]}
            value={value}
            placeholderTextColor={mutedTextColor}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
            autoCorrect={false}
            multiline={false}
            numberOfLines={1}
            onBlur={validateForm}
            {...otherTextInputProps}
          />
          {appendIcon ? memoAppendIcon : null}
        </View>
        <View>
          {Object.values(errors).map((error, index) => (
            <AppText
              key={`${index}-error-message`}
              style={transformClasses("my-1 text-red-400")}
            >
              {error}
            </AppText>
          ))}
        </View>
      </View>
    );
  },
);

export default FormInput;

const styles = StyleSheet.create({
  input: {
    height: 56,
    fontFamily: "Outfit",
    fontSize: 16,
    fontWeight: "500",
  },
});
