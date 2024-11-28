import { memo, useMemo } from "react";
import { LightStyle, DarkStyle } from "@/constants/Theme";
import {
  TextInput,
  StyleSheet,
  useColorScheme,
  View,
  GestureResponderEvent,
} from "react-native";
import { AppText } from "@/components/app/AppText";
import { gray_900, rounded_lg, white } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  readonly value: string;
  readonly label?: string;
  readonly placeholder: string;
  readonly secureTextEntry?: boolean;
  readonly prependIcon?: string;
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

    return (
      <View>
        {label ? <AppText>{label}</AppText> : null}

        <View
          style={[styles.inputContainer, { backgroundColor: backgroundColor }]}
        >
          {prependIcon ? (
            <Ionicons
              name={`${prependIcon}-outline`}
              color={textColor.color}
              size={16}
              style={styles.icon}
              onPress={onPrependPressed}
            />
          ) : null}
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
          {appendIcon ? (
            <Ionicons
              name={`${appendIcon}-outline`}
              color={textColor.color}
              size={18}
              style={styles.icon}
              onPress={onAppendPressed}
            />
          ) : null}
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
