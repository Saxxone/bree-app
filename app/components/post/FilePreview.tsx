import { memo } from "react";
import * as ImagePicker from "expo-image-picker";
import ImageViewer from "../app/ImageViewer";
import { FlatList, Pressable, View } from "react-native";
import tailwindClasses from "@/services/ClassTransformer";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  removable: boolean;
  files: ImagePicker.ImagePickerAsset[];
  className?: string;
  fullScreen?: boolean;
  removeFile?: (index: number) => void;
}

const FilePreview = memo(({ ...props }: Props) => {
  return props.files.length ? (
    <FlatList
      style={
        props.fullScreen ? tailwindClasses("overflow-hidden rounded-lg") : {}
      }
      horizontal
      data={props.files}
      keyExtractor={(file) => file.uri}
      showsHorizontalScrollIndicator={true}
      renderItem={(file) => (
        <View
          style={[
            tailwindClasses(props.fullScreen ? "w-96" : "w-48 my-3 mr-4"),
            tailwindClasses("relative rounded-lg h-56"),
          ]}
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
          <ImageViewer source={file.item.uri} />
        </View>
      )}
    />
  ) : null;
});

export default FilePreview;
