import { View } from "react-native";
import { useSession } from "@/ctx";
import tailwindClasses from "@/services/ClassTransformer";
import AppText from "@/components/app/AppText";

export default function Index() {
  const { signOut } = useSession();
  return (
    <View style={tailwindClasses("container")}>
      <AppText
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
      >
        Sign Out
      </AppText>
    </View>
  );
}
