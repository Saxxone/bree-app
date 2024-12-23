import { memo, useState } from "react";
import FormInput from "../form/FormInput";
import FilePreview from "./FilePreview";
import * as ImagePicker from "expo-image-picker";
import { Post } from "@/types/post";
import { ValidationRule } from "@/hooks/useValidation";
import FilePicker from "../app/FilePicker";
import Text from "../app/Text";
import api_routes from "@/constants/ApiRoutes";
import { ApiConnectService } from "@/services/ApiConnectService";
import { FetchMethod } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { useSnackBar } from "@/context/SnackBarProvider";

interface Props {
  post: Partial<Post>;
  is_comment: number;
  setShortPost: (post: Partial<Post>) => void;
  readonly onValidationError: (errors: Record<string, string> | null) => void;
}

const ShortPostBuilder = memo(({ ...props }: Props) => {
  const [placeholderFiles, setPlaceholderFiles] = useState<
    ImagePicker.ImagePickerAsset[]
  >([]);
  const { snackBar, setSnackBar } = useSnackBar();
  const [shortPost, setShortPost] = useState<Partial<Post>>({});

  function removeFile(index: number) {
    const newFiles = [...placeholderFiles];
    newFiles.splice(index, 1);
    setPlaceholderFiles(newFiles);
  }

  function setPostText(text: string) {
    setShortPost((prev_post) => {
      const new_post = prev_post;
      new_post.text = text;
      return new_post;
    });
    props.setShortPost(shortPost);
  }

  function setPostMedia(data: {
    paths: string[];
    files: ImagePicker.ImagePickerAsset[];
  }) {
    if (data.files.length > 0) {
      setPlaceholderFiles([...data.files]);

      uploadMutation.mutate(data.files, {
        onSuccess: (uploadedPaths) => {
          setShortPost((prev_post) => {
            const new_post = prev_post;
            new_post.media = uploadedPaths as string[];
            return new_post;
          });
          props.setShortPost(shortPost);
        },
        onError: (error) => {
          console.error("File upload failed:", error);
          setSnackBar({
            ...snackBar,
            visible: true,
            title: "Error",
            type: "error",
            message: "Failed to upload",
          });
        },
      });
    }
  }

  const uploadMutation = useMutation({
    mutationFn: async (files: ImagePicker.ImagePickerAsset[]) => {
      const form_data = new FormData();
      files.forEach((file) => {
        form_data.append(
          "app_files",
          {
            uri: file.uri,
            name: file.fileName,
            type: file.type,
          } as any,
          file.fileName as string,
        );
      });

      try {
        const response = await ApiConnectService<string[]>({
          url: api_routes.files.upload,
          method: FetchMethod.POST,
          body: form_data,
        });
        if (response.error) {
          throw new Error(response.error.message || "Upload Failed");
        }
        return response.data;
      } catch (error: any) {
        removeFile(0);
        setSnackBar({
          visible: true,
          title: "Error",
          message: error?.message || "Failed to upload",
          type: "error",
        });

        throw error;
      }
    },
  });

  const handleValidationError = (errors: Record<string, string> | null) => {
    props.onValidationError(errors);
  };

  //TODO make validation for one of two values to be present, i.e either media or text is required
  const validation_rules: Record<string, ValidationRule[]> = {
    media: [{ type: "required", message: "Media file is required" }],
    text: [
      { type: "required", message: "Post text is required." },
      {
        type: "max",
        value: 300,
        message: "Content must not exceeed 300 characters.",
      },
    ],
  };
  return (
    <>
      <FilePreview
        placeholder={placeholderFiles}
        removable={true}
        files={placeholderFiles}
        removeFile={(index) => removeFile(index)}
      />
      <FormInput
        placeholder={
          props.is_comment ? "Reply to this post" : "What's on your mind?"
        }
        value={props.post.text as string}
        validationType="eager"
        validationRules={validation_rules.text}
        autoComplete="username"
        keyboardType="email-address"
        inputMode="text"
        textAlignVertical="top"
        onChangeText={setPostText}
        multiline={true}
        numberOfLines={7}
        onValidationError={handleValidationError}
      />
      <Text className="text-sm text-gray-400 text-right">
        {props.post.text?.length ?? 0}/300
      </Text>
      <FilePicker onSelected={setPostMedia} maxFiles={1} ratio={[5, 3]} />
    </>
  );
});

export default ShortPostBuilder;
