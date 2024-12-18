import { memo, useState } from "react";
import FormInput from "../form/FormInput";
import FilePreview from "./FilePreview";
import * as ImagePicker from "expo-image-picker";
import { Post } from "@/types/post";
import { ValidationRule } from "@/hooks/useValidation";
import FilePicker from "../app/FilePicker";
import Text from "../app/Text";

interface Props {
  post: Partial<Post>;
  is_comment: number;
  setPostText: (v: string) => void;
  readonly onValidationError: (errors: Record<string, string> | null) => void;
}

const ShortPostBuilder = memo(({ ...props }: Props) => {
  const [placeholderFiles, setPlaceholderFiles] = useState<
    ImagePicker.ImagePickerAsset[]
  >([]);

  function removeFile(index: number) {
    const newFiles = [...placeholderFiles];
    newFiles.splice(index, 1);
    setPlaceholderFiles(newFiles);
  }

  function setPostMedia(data: {
    paths: string[];
    files: ImagePicker.ImagePickerAsset[];
  }) {
    setPlaceholderFiles(data.files);
  }

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
        onChangeText={props.setPostText}
        multiline={true}
        numberOfLines={7}
        onValidationError={handleValidationError}
      />
      <Text className="text-sm text-gray-400 text-right">
        {props.post.text?.length ?? 0}/300
      </Text>
      <FilePicker onSelected={setPostMedia} maxFiles={4} />
    </>
  );
});

export default ShortPostBuilder;
