import { Text, View } from "react-native";
import { useSession } from "@/ctx";
import tailwindClasses from "@/services/ClassTransformer";

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
