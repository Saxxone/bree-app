import Text from "@/app_directories/components/app/Text";
import tailwindClasses from "@/app_directories/services/ClassTransformer";
import { useSession } from "@/app_directories/context/AppContext";
import { View } from "react-native";

export default function Index() {
  const { signOut } = useSession();
  return (
    <View style={tailwindClasses("container")}>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
      >
        Sign Out
      </Text>
    </View>
  );
}
