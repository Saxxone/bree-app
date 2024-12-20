import { Link, router } from "expo-router";
import * as Keychain from "react-native-keychain";
import { View, ActivityIndicator } from "react-native";
import { useState } from "react";
import FormInput from "@/components/form/FormInput";
import Text from "@/components/app/Text";
import SpacerY from "@/components/app/SpacerY";
import AppButton from "@/components/form/Button";
import { app_routes } from "@/constants/AppRoutes";
import { primary } from "@/constants/Colors";
import { ValidationRule } from "@/hooks/useValidation";
import { ApiConnectService } from "@/services/ApiConnectService";
import { useQuery } from "@tanstack/react-query";
import api_routes from "@/constants/ApiRoutes";
import { FetchMethod } from "@/types/types";
import { useSnackBar } from "@/context/SnackBarProvider";
import { User } from "@/types/user";
import tailwindClasses from "@/services/ClassTransformer";
import { useSession } from "@/ctx";

export default function Login() {
  const { snackBar, setSnackBar } = useSnackBar();
  const { signIn, signOut } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggled, setToggled] = useState(true);
  const [inputErrors, setInputErrors] = useState<Record<string, string> | null>(
    null,
  );

  const handleValidationError = (errors: Record<string, string> | null) => {
    setInputErrors(errors);
  };

  const validateLogin = () => {
    if (!email || !password) {
      setInputErrors({ login: "Username and password are required." });
      return false;
    }
    setInputErrors(null);
    return true;
  };

  const { isFetching, error, refetch } = useQuery({
    queryKey: ["login", email, password],
    queryFn: async () => {
      const data = {
        email: email.trim(),
        password: password.trim(),
      };

      if (validateLogin()) {
        return await ApiConnectService<User>({
          url: api_routes.login,
          method: FetchMethod.POST,
          body: data,
        });
      } else {
        return undefined;
      }
    },
    enabled: false,
    retry: false,
  });

  const HandleSignIn = async () => {
    if (isFetching) return;

    if (validateLogin()) {
      const response = await refetch();
      const api_url = process.env.EXPO_PUBLIC_API_BASE_URL as string;

      if (error) {
        setSnackBar({
          ...snackBar,
          visible: true,
          title: "Error",
          type: "error",
          message: error.message || "Login failed. Please try again.",
        });
      } else if (response.data && !response.data.error) {
        await Keychain.setGenericPassword(email, password);
        await Keychain.setInternetCredentials(
          api_url,
          "access_token",
          response?.data?.data?.access_token as string,
        );
        signIn();
        router.replace(app_routes.post.home);
      }
    }
  };

  function togglePasswordField() {
    setToggled(!toggled);
  }

  const validationRules: Record<string, ValidationRule[]> = {
    password: [
      { type: "required", message: "Password is required." },
      {
        type: "min",
        value: 4,
        message: "Password must be at least 4 characters.",
      },
    ],
    username: [{ type: "required", message: "Username is required." }],
  };

  return (
    <View style={tailwindClasses("container")}>
      <SpacerY size="lg" />
      <Text style={tailwindClasses("text-3xl font-bold")}>
        Login your account
      </Text>

      <SpacerY size="xxs" />

      <FormInput
        placeholder="Enter your email or username"
        value={email}
        validationRules={validationRules.username}
        autoComplete="username"
        keyboardType="email-address"
        inputMode="email"
        onChangeText={setEmail}
        prependIcon="person-outline"
        onValidationError={handleValidationError}
      />
      <FormInput
        placeholder="Password"
        validationRules={validationRules.password}
        value={password}
        autoComplete="password"
        inputMode="text"
        onChangeText={setPassword}
        secureTextEntry={toggled}
        prependIcon="lock-closed-outline"
        onAppendPressed={togglePasswordField}
        appendIcon={toggled ? "eye-outline" : "eye-off-outline"}
        onValidationError={handleValidationError}
      />

      <View style={tailwindClasses("justify-end flex-row w-full")}>
        <Link href={app_routes.forgotPassword}>
          <Text style={tailwindClasses("self-end")}>Forgot password?</Text>
        </Link>
      </View>

      <SpacerY size="xxs" />

      <AppButton onPress={HandleSignIn} theme="primary">
        {isFetching ? <ActivityIndicator size="small" color="#fff" /> : "Login"}
      </AppButton>

      <View>
        {inputErrors
          ? Object.values(inputErrors).map((error, index) => (
              <Text key={`${index}-error-message`}>{error}</Text>
            ))
          : null}
      </View>

      <SpacerY size="xxs" />

      <View style={tailwindClasses("flex-row justify-center w-full")}>
        <Link href={app_routes.register}>
          <Text>Create new account?</Text>
          <Text style={{ color: primary }}> Sign up</Text>
        </Link>
      </View>
    </View>
  );
}
