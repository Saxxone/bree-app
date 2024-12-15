import tailwindClasses from "@/services/ClassTransformer";
import { Snack } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useMemo, useState } from "react";
import { Pressable } from "react-native";
import SnackBar from "./SnackBar";

interface Props {
  readonly onSelected: (data: {
    paths: string[];
    files: ImagePicker.ImagePickerAsset[];
  }) => void; // Correct type for onSelected
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly disabled?: boolean;
  readonly maxFiles?: number;
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
      allowsMultipleSelection: true,
      selectionLimit: props.maxFiles ?? 1,
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      console.log(result);
      onSelected({
        paths: result.assets.map((asset) => asset.uri),
        files: result.assets,
      });
    } else {
      setSnackBar({
        visible: true,
        title: "Info",
        type: "info",
        message: "No file selected.",
      });
    }
  };

  const classes = useMemo(
    () => tailwindClasses(props.className ?? ""),
    [props.className],
  );
  return (
    <>
      <SnackBar
        snack={snackBar}
        onClose={() => setSnackBar({ ...snackBar, visible: false })}
      />
      <Pressable onPress={pickImageAsync} style={[classes]}>
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
