import { router } from "expo-router";
import { View, Button } from "react-native";
import { useSession } from "@/ctx";
import { useState } from "react";
import { FormInput } from "@/components/form/FormInput";
import { styles } from "@/styles/main";
import { AppText } from "@/components/app/AppText";
import { SpacerY } from "@/components/app/SpacerY";

export default function Login() {
  const { signIn } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    signIn();
    router.replace("/screens/(home)");
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.h1}>Login your account</AppText>

      <SpacerY size="xs" />

      <FormInput placeholder="Enter email or username" value={username} onChangeText={setUsername} />
      <FormInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" color={styles.buttonPrimary.backgroundColor} onPress={handleSignIn} />
    </View>
  );
}
