import { useSession } from "@/app/ctx";
import Text from "@/app-directories/components/app/Text";
import tailwindClasses from "@/app-directories/services/ClassTransformer";
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
