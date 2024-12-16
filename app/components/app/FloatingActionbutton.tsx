import tailwindClasses from "@/services/ClassTransformer";
import { Ionicons } from "@expo/vector-icons";
import { Link, RelativePathString } from "expo-router";
import { memo } from "react";
import { View } from "react-native";

interface Props {
  to: RelativePathString;
  icon: "pencil-outline";
}

const FloatingActionButton = memo(({ to, icon }: Props) => {
  return (
    <Link href={to} style={tailwindClasses("absolute bottom-24 z-50 right-3")}>
      <View
        style={tailwindClasses(
          "justify-center bg-indigo-500 flex items-center text-white shadow-xl p-4 rounded-full w-14 h-14",
        )}
      >
        <Ionicons name={icon} size={24} color="white" />
      </View>
    </Link>
  );
});

export default FloatingActionButton;
