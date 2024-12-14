import tailwindClasses from "@/services/ClassTransformer";
import { Snack } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Pressable } from "react-native";
import SnackBar from "./SnackBar";

interface Props {
  readonly onSelected: (media: string[]) => void;
  readonly children?: React.ReactNode;
}

export default function FilePicker({ onSelected, ...props }: Props) {
  const [snackBar, setSnackBar] = useState<Snack>({
    visible: false,
    title: "",
    message: "",
    type: "error",
  });

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      console.log(result);
      onSelected(result.assets.map((asset) => asset.uri));
    } else {
      setSnackBar({
        visible: true,
        title: "Info",
        type: "info",
        message: "No file selected.",
      });
    }
  };
  return (
    <>
      <SnackBar
        snack={snackBar}
        onClose={() => setSnackBar({ ...snackBar, visible: false })}
      />
      <Pressable onPress={pickImageAsync}>
        {props.children ? (
          props.children
        ) : (
          <Ionicons
            name="images"
            size={16}
            style={[tailwindClasses("text-gray-400 p-2")]}
          />
        )}
      </Pressable>
    </>
  );
}
