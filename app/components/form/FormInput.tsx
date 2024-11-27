import { LightStyle, DarkStyle } from "@/constants/Theme";
import { TextInput, StyleSheet, useColorScheme, View } from "react-native";
import { AppText } from "../app/AppText";
import { gray_900, rounded_lg, white } from "@/constants/Colors";

interface Props {
  readonly value: string;
  readonly label?: string;
  readonly placeholder: string;
  readonly secureTextEntry?: boolean;
  readonly onChangeText: (text: string) => void;
}

export function FormInput({ label, value, placeholder, secureTextEntry, onChangeText }: Props) {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? DarkStyle.textColor : LightStyle.textColor;
  const mutedTextColor = colorScheme === "dark" ? DarkStyle.mutedTextColor.color : LightStyle.mutedTextColor.color;
  const backgroundColor = colorScheme === "dark" ? gray_900 : white;

  return (
    <View style={[styles.inputContainer, { backgroundColor: backgroundColor }]}>
      {label ? <AppText>{label}</AppText> : null}
      <TextInput
        placeholder={placeholder}
        style={[styles.input, textColor, { backgroundColor: backgroundColor }]}
        value={value}
        placeholderTextColor={mutedTextColor}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 24,
  },
  inputContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: rounded_lg,
  },
});
