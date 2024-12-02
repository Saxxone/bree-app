import { Link, router } from "expo-router";
import { View, StyleSheet, Text } from "react-native";
import { useSession } from "@/ctx";
import { useState } from "react";
import FormInput from "@/components/form/FormInput";
import { styles } from "@/styles/main";
import AppText from "@/components/app/AppText";
import SpacerY from "@/components/app/SpacerY";
import AppButton from "@/components/form/Button";
import { app_routes } from "@/constants/Routes";
import { primary } from "@/constants/Colors";

export default function Login() {
  const { signIn } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toggled, setToggled] = useState(true);
  const [inputErrors, setInputErrors] = useState<Record<string, string> | null>(
    null,
  );

  const handleValidationError = (errors: Record<string, string> | null) => {
    setInputErrors(errors);
  };

  const handleSignIn = () => {
    if (inputErrors) return;
    signIn();
    router.replace("/screens/(home)");
  };

  function togglePasswordField() {
    setToggled(!toggled);
  }

  return (
    <View style={styles.container}>
      <SpacerY size="xl" />
      <AppText style={styles.h1}>Login your account</AppText>

      <SpacerY size="xxs" />

      <FormInput
        placeholder="Enter your email or username"
        value={username}
        autoComplete="username"
        keyboardType="email-address"
        inputMode="email"
        onChangeText={setUsername}
        prependIcon="person-outline"
        onValidationError={handleValidationError}
      />
      <FormInput
        placeholder="Password"
        value={password}
        autoComplete="password"
        inputMode="none"
        onChangeText={setPassword}
        secureTextEntry={toggled}
        prependIcon="lock-closed-outline"
        onAppendPressed={togglePasswordField}
        appendIcon={toggled ? "eye-outline" : "eye-off-outline"}
        onValidationError={handleValidationError}
      />

      <View style={style.flexend}>
        <Link href={app_routes.forgotPassword}>
          <AppText style={{ alignSelf: "flex-end" }}>Forgot password?</AppText>
        </Link>
      </View>

      <Text>
        {username}
        {password}
      </Text>

      <SpacerY size="xxs" />

      <AppButton onPress={handleSignIn} theme="primary">
        Login
      </AppButton>

      <SpacerY size="xxs" />

      <View style={style.flexcenter}>
        <Link href={app_routes.register}>
          <AppText>Create new account?</AppText>
          <AppText style={{ color: primary }}> Sign up</AppText>
        </Link>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  flexend: {
    justifyContent: "flex-end",
    width: "100%",
    flexDirection: "row",
  },
  flexcenter: {
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
  },
});
