import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { memo, useMemo } from "react";
import { FlatList, Pressable, View } from "react-native";
import tailwindClasses from "@/app_directories/services/ClassTransformer";
import ImageViewer from "../app/ImageViewer";

interface Props {
  readonly removable: boolean;
  readonly files: ImagePicker.ImagePickerAsset[];
  readonly placeholder?: ImagePicker.ImagePickerAsset[];
  readonly className?: string;
  readonly fullScreen?: boolean;
  readonly removeFile?: (index: number) => void;
}

const FilePreview = memo(({ ...props }: Props) => {
  const classes = useMemo(
    () => tailwindClasses(props.className ?? ""),
    [props.className],
  );
  return props.files.length ? (
    <FlatList
      style={[classes]}
      horizontal
      data={props.files}
      keyExtractor={(file) => file.uri}
      showsHorizontalScrollIndicator={true}
      renderItem={(file) => (
        <View
          style={[tailwindClasses("w-48 my-3 mr-4 relative rounded-lg h-56")]}
        >
          {props.removable && props.removeFile && (
            <Pressable
              onPress={() => props.removeFile?.(file.index)}
              style={tailwindClasses(
                "z-10 flex absolute items-center justify-center top-2 bg-gray-800 rounded-full p-1 right-2 h-8 w-8",
              )}
            >
              <Ionicons
                name="close-outline"
                size={20}
                style={tailwindClasses("text-gray-400")}
              />
            </Pressable>
          )}
          <ImageViewer
            source={file.item.uri}
            placeholder={props.placeholder?.[file.index].uri}
          />
        </View>
      )}
    />
  ) : null;
});

export default FilePreview;
