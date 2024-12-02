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

    const validationRules: ValidationRule[] = useMemo(() => {
      if (autoComplete === "email") {
        return [
          { type: "required", message: "Email is required" },
          { type: "email", message: "Invalid email format" },
        ];
      } else if (autoComplete === "password") {
        return [
          { type: "required", message: "Password is required." },
          {
            type: "min",
            value: 4,
            message: "Password must be at least 4 characters.",
          },
        ];
      } else if (autoComplete === "username") {
        return [{ type: "required", message: "Username is required." }];
      }
      return [];
    }, [autoComplete]);

    const validateForm = useCallback(() => {
      const newErrors = validate(value, validationRules); // Call validate with rules
      setErrors(newErrors);
      setIsInputValid(Object.keys(newErrors).length === 0);

      if (onValidationError) {
        onValidationError(Object.keys(newErrors).length > 0 ? newErrors : null);
      }
    }, [value, validationRules, onValidationError, validate]); // Correct dependencies

    useEffect(() => {
      validateForm();
    }, [validateForm, value]); // Correct dependencies

    const handleChangeText = (text: string) => {
      onChangeText(text);
      validateForm();
    };

    const memoPrependIcon = useMemo(() => {
      if (!prependIcon) return null;

      return (
        <Pressable onPress={onPrependPressed} style={styles.icon}>
          <Ionicons name={prependIcon} size={18} color={textColor.color} />
        </Pressable>
      );
    }, [prependIcon, textColor]);

    const memoAppendIcon = useMemo(() => {
      if (!appendIcon) return null;

      return (
        <Pressable onPress={onAppendPressed} style={styles.icon}>
          <Ionicons name={appendIcon} size={18} color={textColor.color} />
        </Pressable>
      );
    }, [appendIcon, textColor]);

    return (
      <View style={[styles.inputWrapper]}>
        {label ? <AppText>{label}</AppText> : null}

        <View
          style={[
            isInputValid ? null : styles.errorCont,
            styles.inputContainer,
            { backgroundColor: backgroundColor },
          ]}
        >
          {prependIcon ? memoPrependIcon : null}
          <TextInput
            placeholder={placeholder}
            style={[
              styles.input,
              textColor,
              { backgroundColor: backgroundColor },
            ]}
            value={value}
            placeholderTextColor={mutedTextColor}
            onChangeText={handleChangeText}
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
            autoCorrect={false}
            multiline={false}
            numberOfLines={1}
            {...otherTextInputProps}
          />
          {appendIcon ? memoAppendIcon : null}
        </View>
        <View>
          {Object.values(errors).map((error, index) => (
            <AppText key={index} style={styles.error}>
              {error as string}
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
    height: 24,
    fontFamily: "Outfit",
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
    borderColor: "transparent",
    outline: "none",
  },
  icon: {
    margin: 0,
    paddingHorizontal: 2,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputContainer: {
    padding: 16,
    borderRadius: rounded_lg,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
  },
  error: {
    color: red_400,
    fontSize: 12,
    fontWeight: "300",
    marginBottom: 12,
    marginTop: 4,
  },
  errorCont: {
    borderColor: red_400,
    borderWidth: 1,
  },
});
