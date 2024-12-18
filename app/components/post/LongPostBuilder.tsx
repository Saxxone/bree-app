import { memo, useState } from "react";
import Text from "../app/Text";
import FilePicker from "../app/FilePicker";
import FilePreview from "./FilePreview";
import * as ImagePicker from "expo-image-picker";
import FormInput from "../form/FormInput";
import { ValidationRule } from "@/hooks/useValidation";
import { View } from "react-native";
import Button from "../form/Button";
import tailwindClasses from "@/services/ClassTransformer";
import PagerViewIndicator from "../app/PagerViewIndicator";
import PagerView from "../app/PagerView";
import { LongPost } from "@/types/post";
import api_routes from "@/constants/ApiRoutes";
import { ApiConnectService } from "@/services/ApiConnectService";
import { FetchMethod } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { useSnackBar } from "@/context/SnackBarProvider";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";

interface Props {
  readonly post: Partial<LongPost> | null | undefined;
  readonly setLongPost: (data: any) => void;
  readonly onValidationError: (errors: Record<string, string> | null) => void;
}

const LongPostBuilder = memo(({ ...props }: Props) => {
  const { snackBar, setSnackBar } = useSnackBar();
  const [placeholderFiles, setPlaceholderFiles] = useState<
    ImagePicker.ImagePickerAsset[][]
  >([]);

  const [contents, setContents] = useState<
    { text: string; media: string[]; files: ImagePicker.ImagePickerAsset[] }[]
  >([{ text: "", media: [], files: [] }]);

  function setPostText(v: string, index: number) {
    const new_contents = [...contents];
    new_contents[index].text = v;
    setContents(new_contents);
    props.setLongPost(new_contents);
  }

  function removePage() {
    const new_contents = [...contents];
    new_contents.splice(currentPage, 1);
    setContents(new_contents);
    const newFiles = [...placeholderFiles];
    newFiles.splice(currentPage, 1);
    setPlaceholderFiles(newFiles);
    props.setLongPost(new_contents);
  }

  const handleValidationError = (errors: Record<string, string> | null) => {
    props.onValidationError(errors);
  };

  const validation_rules: Record<string, ValidationRule[]> = {
    media: [{ type: "required", message: "Media file is required" }],
    text: [
      { type: "required", message: "Post text is required." },
      {
        type: "max",
        value: 300,
        message: "Post text must not exceeed 300 characters.",
      },
    ],
  };

  const [currentPage, setCurrentPage] = useState(0);

  function addPage() {
    if (contents.length < 7) {
      setContents([...contents, { text: "", media: [], files: [] }]);
    }
  }

  function setPostMedia(
    data: { paths: string[]; files: ImagePicker.ImagePickerAsset[] },
    index: number,
  ) {
    if (data.files.length > 0) {
      placeholderFiles[index] = data.files;
      setPlaceholderFiles([...placeholderFiles]);

      uploadMutation.mutate(data.files, {
        onSuccess: (uploadedPaths) => {
          setContents((prevContents) => {
            const newContents = [...prevContents];
            newContents[index].media = uploadedPaths as string[];
            newContents[index].files = data.files;
            return newContents;
          });
          console.log("File upload successful:", uploadedPaths, contents);
        },
        onError: (error) => {
          console.error("File upload failed:", error);
          setSnackBar({
            ...snackBar,
            visible: true,
            title: "Error",
            type: "error",
            message: "Failed to upload files",
          });
        },
      });
    }
  }

  const uploadMutation = useMutation({
    mutationFn: async (files: ImagePicker.ImagePickerAsset[]) => {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append(
          "app_files",
          file as unknown as Blob,
          file.fileName as string,
        );
      });

      try {
        const response = await ApiConnectService<string[]>({
          url: api_routes.files.upload,
          method: FetchMethod.POST,
          body: formData,
        });
        if (response.error) {
          throw new Error(response.error.message || "Upload Failed");
        }
        return response.data;
      } catch (error: any) {
        console.error("Error uploading files:", error);
        setSnackBar({
          visible: true,
          title: "Error",
          message: error?.message || "Failed to upload files",
          type: "error",
        });

        throw error;
      }
    },
  });

  return (
    <>
      <View
        style={tailwindClasses("flex flex-row justify-between items-center")}
      >
        <View style={tailwindClasses("h-7 w-7")}>
          {contents.length > 1 ? (
            <Button
              className="flex items-center justify-center bg-gray-900 rounded-full px-0 py-0 h-7 w-7"
              onPress={removePage}
              disabled={contents.length === 1}
            >
              <Ionicons
                name="close-outline"
                size={20}
                style={tailwindClasses("text-gray-300")}
              />
            </Button>
          ) : null}
        </View>

        <View
          style={tailwindClasses(
            "text-main bg-base-white flex mx-auto h-8 w-8 items-center justify-center rounded-full",
          )}
        >
          <Text className="text-sm">{currentPage + 1}</Text>
        </View>

        <View style={tailwindClasses("w-6 mr-2")}>
          {contents.length < 7 ? (
            <AntDesign
              name="plussquare"
              size={24}
              style={tailwindClasses("text-blue-300 ")}
              onPress={addPage}
            />
          ) : null}
        </View>
      </View>

      <PagerView
        initialPage={0}
        onPageScroll={(e) => setCurrentPage(e)}
        spacing={32}
      >
        {contents.map((content, index) => {
          return (
            <View
              style={[tailwindClasses("rounded-md")]}
              key={"content-" + index + "-long-post"}
            >
              <View style={tailwindClasses("h-6")}>
                {contents.length > 1 ? (
                  <PagerViewIndicator
                    currentPage={currentPage}
                    length={contents.length}
                    className="mb-4"
                  />
                ) : null}
              </View>
              <FilePicker
                onSelected={(media) => setPostMedia(media, index)}
                maxFiles={1}
                ratio={[5, 3]}
                validationRules={validation_rules.media}
                onValidationError={handleValidationError}
                className="h-56 text-main  flex flex-row justify-center items-center text-center border-gray-600 mb-4 rounded-lg border"
              >
                {content.files ? (
                  <FilePreview
                    removable={false}
                    placeholder={placeholderFiles[index]}
                    files={content.files}
                    fullScreen={true}
                  />
                ) : (
                  <View style={[tailwindClasses("p-3 mb-3 ")]}>
                    <Text className="text-center text-gray-500">
                      Select File to Upload
                    </Text>
                  </View>
                )}
              </FilePicker>

              <FormInput
                placeholder={"What's on your mind?"}
                value={content.text}
                validationType="eager"
                validationRules={validation_rules.text}
                autoComplete="username"
                keyboardType="email-address"
                inputMode="text"
                textAlignVertical="top"
                onChangeText={(text) => setPostText(text, index)}
                multiline={true}
                numberOfLines={7}
                onValidationError={handleValidationError}
              />
              <Text className="text-sm text-gray-400 text-right">
                {props.post?.content?.[index]?.text?.length ?? 0}/300
              </Text>
            </View>
          );
        })}
      </PagerView>
    </>
  );
});

export default LongPostBuilder;
