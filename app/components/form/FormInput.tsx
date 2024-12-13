import { memo, useCallback, useMemo, useState } from "react";
import { ValidationRule, useValidation } from "@/hooks/useValidation";
import { LightStyle, DarkStyle } from "@/constants/Theme";
import {
  TextInput,
  Pressable,
  useColorScheme,
  View,
  GestureResponderEvent,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import AppText from "@/components/app/AppText";
import { gray_900, white } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import tailwindClasses from "@/services/ClassTransformer";

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
  readonly className?: string;
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
    className,
    ...props
  }: Props) => {
    const color_scheme = useColorScheme();

    const classes = useMemo(
      () => tailwindClasses(className ?? ""),
      [className],
    );

    const textColor = useMemo(
      () =>
        color_scheme === "dark" ? DarkStyle.textColor : LightStyle.textColor,
      [color_scheme],
    );

    const mutedTextColor = useMemo(
      () =>
        color_scheme === "dark"
          ? DarkStyle.mutedTextColor.color
          : LightStyle.mutedTextColor.color,
      [color_scheme],
    );

    const backgroundColor = useMemo(
      () => (color_scheme === "dark" ? gray_900 : white),
      [color_scheme],
    );

    const [isInputValid, setIsInputValid] = useState({});

    const { validate, errors, setErrors } = useValidation();

    const validateInput = useCallback(() => {
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
          style={tailwindClasses("m-0 px-0.5")}
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
          style={tailwindClasses("m-0 px-0.5")}
        >
          <Ionicons name={appendIcon} size={18} color={textColor.color} />
        </Pressable>
      );
    }, [appendIcon, textColor]);

    return (
      <View style={[tailwindClasses("mb-4"), classes, style]}>
        {label ? <AppText>{label}</AppText> : null}

        <View
          style={[
            tailwindClasses(
              "px-3 border border-transparent rounded-lg w-full flex flex-row items-center flex-wrap items-center gap-x-2",
            ),
            isInputValid ? null : tailwindClasses("border-rose-500 border"),
            { backgroundColor: backgroundColor },
          ]}
        >
          {prependIcon ? memoPrependIcon : null}
          <TextInput
            placeholder={placeholder}
            style={[
              tailwindClasses("flex-1 font-light border-transparent"),
              props.multiline
                ? tailwindClasses("h-32 bg-rose-500 mt-4")
                : tailwindClasses("h-14"),
              textColor,
              { backgroundColor: backgroundColor },
            ]}
            value={value}
            placeholderTextColor={mutedTextColor}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
            autoCorrect={props.autoCorrect}
            numberOfLines={props.multiline ? 6 : 1}
            onBlur={validateInput}
            {...props}
          />
          {appendIcon ? memoAppendIcon : null}
        </View>
        <View>
          {Object.values(errors).map((error, index) => (
            <AppText
              key={`${index}-error-message`}
              style={tailwindClasses("my-1 text-red-400")}
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
