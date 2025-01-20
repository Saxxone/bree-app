import { Image } from "expo-image";
import { router } from "expo-router";
import { View } from "react-native";
import { getTokens } from "@/app_directories/services/ApiConnectService";
import tailwindClasses from "@/app_directories/services/ClassTransformer";
import { app_routes } from "@/app_directories/constants/AppRoutes";

export default function Index() {
  (async function getAuthStatus() {
    const { access_token } = await getTokens();
    console.log("::token::", access_token);
    if (access_token) {
      console.log("Authenticated");
      router.replace(app_routes.post.home);
    } else {
      console.log("Redirecting to login");
      if (router) {
        console.log("Router is available");
        router.push("/screens/auth/login");
      } else {
        console.error("Router is not available");
      }
    }
  })();

  return (
    <View
      style={tailwindClasses(
        "container flex h-full justify-center items-center",
      )}
    >
      <Image
        source={require("@/app_directories/assets/images/bree.png")}
        contentFit="cover"
        style={[tailwindClasses("rounded-lg h-20 w-20 object-cover")]}
      />
    </View>
  );
}
