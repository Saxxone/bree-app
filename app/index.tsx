import { View } from "react-native";
import { Link, router } from "expo-router";
import Text from "./components/app/Text";
import { retrieveTokenFromKeychain } from "@/services/ApiConnectService";
import { app_routes } from "./constants/AppRoutes";
import tailwindClasses from "./services/ClassTransformer";

export default function Index() {
  //TODO fix this page design and handle auth better
  (async function getAuthStatus() {
    const token = await retrieveTokenFromKeychain();
    if (token) {
      router.replace(app_routes.posts.home);
    }
  })();

  return (
    <View style={tailwindClasses("container")}>
      <Text>Home screen</Text>
      <Link
        href="/screens/(auth)/login"
        style={tailwindClasses("p-4 bg-primary rounded-lg text-white")}
      >
        <Text>Go to Login screen</Text>
      </Link>
      <Link
        href="/screens/(app)/compose"
        style={tailwindClasses("p-4 bg-primary rounded-lg text-white")}
      >
        <Text>Compose a Post</Text>
      </Link>
    </View>
  );
}
