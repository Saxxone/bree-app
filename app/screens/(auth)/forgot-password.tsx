import { Link } from "expo-router";
import { View } from "react-native";
import { useState } from "react";
import FormInput from "@/components/form/FormInput";
import AppText from "@/components/app/AppText";
import SpacerY from "@/components/app/SpacerY";
import AppButton from "@/components/form/Button";
import { app_routes } from "@/constants/AppRoutes";
import { primary } from "@/constants/Colors";
import { ValidationRule } from "@/hooks/useValidation";
import { ApiConnectService } from "@/services/ApiConnectService";
import { useQuery } from "@tanstack/react-query";
import api_routes from "@/constants/ApiRoutes";
import { FetchMethod, Snack } from "@/types/types";
import SnackBar from "@/components/app/SnackBar";
import tailwindClasses from "@/services/ClassTransformer";

export default function Login() {
  const [snackBar, setSnackBar] = useState<Snack>({
    visible: false,
    title: "",
    message: "",
    type: "error",
  });
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
          visible: true,
          title: "Error",
          type: "error",
          message: error.message || "Login failed. Please try again.",
        });
      } else {
        setSnackBar({
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
      <SnackBar
        snack={snackBar}
        onClose={() => setSnackBar({ ...snackBar, visible: false })}
      />
      <SpacerY size="lg" />
      <AppText style={tailwindClasses("text-3xl font-bold")}>
        Login your account
      </AppText>

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
          <AppText style={tailwindClasses("self-end")}>
            Forgot password?
          </AppText>
        </Link>
      </View>

      <SpacerY size="xxs" />

      <AppButton onPress={HandleSignIn} theme="primary">
        Login
      </AppButton>

      <View>
        {inputErrors
          ? Object.values(inputErrors).map((error, index) => (
              <AppText key={`${index}-error-message`}>{error}</AppText>
            ))
          : null}
      </View>

      <SpacerY size="xxs" />

      <View style={tailwindClasses("flex-row justify-center w-full")}>
        <Link href={app_routes.register}>
          <AppText>Create new account?</AppText>
          <AppText style={{ color: primary }}> Sign up</AppText>
        </Link>
      </View>
    </View>
  );
}
