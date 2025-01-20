import SpacerY from "@/app_directories/components/app/SpacerY";
import Text from "@/app_directories/components/app/Text";
import AppButton from "@/app_directories/components/form/Button";
import FormInput from "@/app_directories/components/form/FormInput";
import api_routes from "@/app_directories/constants/ApiRoutes";
import { app_routes } from "@/app_directories/constants/AppRoutes";
import { primary } from "@/app_directories/constants/Colors";
import { useSnackBar } from "@/app_directories/context/SnackBarProvider";
import { ApiConnectService } from "@/app_directories/services/ApiConnectService";
import tailwindClasses from "@/app_directories/services/ClassTransformer";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { ValidationRule } from "@/app_directories/hooks/useValidation";
import { FetchMethod } from "@/app_directories/types/types";

export default function Login() {
  const { snackBar, setSnackBar } = useSnackBar();
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

  const { error, refetch } = useQuery({
    queryKey: ["login", email, password],
    queryFn: async () => {
      const data = {
        email: email.trim(),
        password: password.trim(),
      };

      if (validateLogin()) {
        return await ApiConnectService<any>({
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
    if (validateLogin()) {
      const response = await refetch();

      if (response.data) {
        // // Assuming your API returns a success flag
        // signIn(); // Call signIn only if the API call is successful
        // router.replace(app_routes.home);
      } else if (error) {
        setSnackBar({
          ...snackBar,
          visible: true,
          title: "Error",
          type: "error",
          message: error.message || "Login failed. Please try again.",
        });
      } else {
        setSnackBar({
          ...snackBar,
          visible: true,
          title: "Error",
          type: "error",
          message: "Login failed. Please try again.",
        });
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
        <Link href={app_routes.auth.forgot_password}>
          <Text style={tailwindClasses("self-end")}>Forgot password?</Text>
        </Link>
      </View>

      <SpacerY size="xxs" />

      <AppButton onPress={HandleSignIn} theme="primary">
        Login
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
        <Link href={app_routes.auth.register}>
          <Text>Create new account?</Text>
          <Text style={{ color: primary }}> Sign up</Text>
        </Link>
      </View>
    </View>
  );
}
