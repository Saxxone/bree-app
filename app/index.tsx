import { View } from "react-native";
import { router } from "expo-router";
import { retrieveTokenFromKeychain } from "@/services/ApiConnectService";
import { app_routes } from "./constants/AppRoutes";
import tailwindClasses from "./services/ClassTransformer";
import { Image } from "expo-image";

export default function Index() {
  (async function getAuthStatus() {
    const token = await retrieveTokenFromKeychain();
    console.log("token:::::", token);
    if (token) {
      router.replace(app_routes.post.home);
    } else {
      router.replace(app_routes.auth.login);
    }
  })();

  return (
    <View
      style={tailwindClasses(
        "container flex h-full justify-center items-center",
      )}
    >
      <Image
        source={require("@/assets/images/bree.png")}
        contentFit="cover"
        style={[tailwindClasses("rounded-lg h-20 w-20 object-cover")]}
      />
    </View>
  );
}
