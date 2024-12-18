import { View } from "react-native";
import { router } from "expo-router";
import { retrieveTokenFromKeychain } from "@/services/ApiConnectService";
import { app_routes } from "./constants/AppRoutes";
import tailwindClasses from "./services/ClassTransformer";
import { Image } from "expo-image";

export default function Index() {
  //TODO fix this page design and handle auth better
  (async function getAuthStatus() {
    const token = await retrieveTokenFromKeychain();
    if (token) {
      router.replace(app_routes.post.home);
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
