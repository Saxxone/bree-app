import tailwindClasses from "@/services/ClassTransformer";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useMemo } from "react";
import { Pressable } from "react-native";
import { useSnackBar } from "@/context/SnackBarProvider";

interface Props {
  readonly onSelected: (data: {
    paths: string[];
    files: ImagePicker.ImagePickerAsset[];
  }) => void;
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly disabled?: boolean;
  readonly maxFiles?: number;
}

export default function FilePicker({ onSelected, ...props }: Props) {
  const { snackBar, setSnackBar } = useSnackBar();

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      ...(props.maxFiles &&
        props.maxFiles > 1 && {
          allowsMultipleSelection: true,
        }),
      selectionLimit: props.maxFiles ?? 1,
      mediaTypes: ["images", "videos"],
      ...(props.maxFiles === 1 && {
        allowsEditing: true,
      }),
      quality: 0.8,
    });

    if (!result.canceled) {
      onSelected({
        paths: result.assets.map((asset) => asset.uri),
        files: result.assets,
      });
    } else {
      console.log("User canceled image picker");
      setSnackBar({
        ...snackBar,
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
  );
}
