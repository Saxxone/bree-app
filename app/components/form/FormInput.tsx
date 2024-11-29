import { memo, useMemo } from "react";
import { LightStyle, DarkStyle } from "@/constants/Theme";
import {
  TextInput,
  Pressable,
  StyleSheet,
  useColorScheme,
  View,
  GestureResponderEvent,
} from "react-native";
import AppText from "@/components/app/AppText";
import { gray_900, rounded_lg, white } from "@/constants/Colors";
import { Icon, IconifyIcon } from "@iconify/react";

interface Props {
  readonly value: string;
  readonly label?: string;
  readonly placeholder: string;
  readonly secureTextEntry?: boolean;
  readonly prependIcon?: string | IconifyIcon;
  readonly appendIcon?: string;
  readonly onChangeText: (text: string) => void;
  readonly onPrependPressed?: (event: GestureResponderEvent) => void;
  readonly onAppendPressed?: (event: GestureResponderEvent) => void;
}

const FormInput = memo(
  ({
    label,
    value,
    placeholder,
    secureTextEntry,
    prependIcon,
    appendIcon,
    onPrependPressed,
    onAppendPressed,
    onChangeText,
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

    const memoPrependIcon = useMemo(() => {
      if (!prependIcon) return null;

      return (
        <Pressable onPress={onPrependPressed} style={styles.icon}>
          <Icon icon={prependIcon} color={textColor.color} />
        </Pressable>
      );
    }, [prependIcon]);

    const memoAppendIcon = useMemo(() => {
      if (!appendIcon) return null;

      return (
        <Pressable onPress={onAppendPressed} style={styles.icon}>
          <Icon icon={appendIcon} color={textColor.color} />
        </Pressable>
      );
    }, [appendIcon]);

    return (
      <View>
        {label ? <AppText>{label}</AppText> : null}

        <View
          style={[styles.inputContainer, { backgroundColor: backgroundColor }]}
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
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
            autoCorrect={false}
            multiline={false}
            numberOfLines={1}
          />
          {appendIcon ? memoAppendIcon : null}
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
  },
  icon: {
    margin: 0,
    paddingHorizontal: 2,
  },
  inputContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: rounded_lg,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
  },
});
