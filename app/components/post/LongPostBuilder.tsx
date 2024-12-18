import { memo, useState } from "react";
import Text from "../app/Text";
import FilePicker from "../app/FilePicker";
import FilePreview from "./FilePreview";
import * as ImagePicker from "expo-image-picker";
import { Post } from "@/types/post";
import FormInput from "../form/FormInput";
import { ValidationRule } from "@/hooks/useValidation";
import { View } from "react-native";
import Button from "../form/Button";
import tailwindClasses from "@/services/ClassTransformer";

const LongPostBuilder = memo(() => {
  const [placeholderFiles, setPlaceholderFiles] = useState<
    ImagePicker.ImagePickerAsset[]
  >([]);

  const [post, setPost] = useState<Post>({
    id: "78dc3aeb-3d62-4156-aeed-7bde5998dce5",
    text: "I'll be tinkering with Raspberry Pi and Arduino.  I look forward to all the cool stuff I'll build.\n\nI love robotics a lot.  Let's see what happens ❤️",
    media: [
      "https://pbs.bree.social/1000258433-95de6daf4c4ec23cdb14267d1038c1c35.jpg",
    ],
    mediaTypes: ["image"],
    published: true,
    authorId: "e1fb38c2-c10b-43c2-a6bc-3d286eccfc85",
    likeCount: 0,
    bookmarkCount: 0,
    parentId: null,
    commentCount: 0,
    createdAt: "2024-12-10T02:25:41.743Z",
    updatedAt: "2024-12-10T02:25:41.743Z",
    deletedAt: null,
    type: "SHORT",
    longPostId: null,
    likedBy: [],
    bookmarkedBy: [],
    author: {
      id: "e1fb38c2-c10b-43c2-a6bc-3d286eccfc85",
      name: "Stephen Udoekpo",
      img: "https://pbs.bree.social/a5f541cf-5845-49a0-bf5d-f22528ff8315.jpg",
      username: "saxxone17@gmail.com",
    },
    longPost: null,
    likedByMe: false,
    bookmarkedByMe: false,
  });

  const [inputErrors, setInputErrors] = useState<Record<string, string> | null>(
    null,
  );
  function setPostText(v: string) {
    setPost({ ...post, text: v });
  }
  function setPostMedia(data: {
    paths: string[];
    files: ImagePicker.ImagePickerAsset[];
  }) {
    setPost({ ...post, media: data.paths });
    setPlaceholderFiles(data.files);
  }

  const handleValidationError = (errors: Record<string, string> | null) => {
    setInputErrors(errors);
  };

  //TODO make validation for one of two values to be present, i.e either media or text is required
  const validation_rules: Record<string, ValidationRule[]> = {
    post: [
      { type: "required", message: "Password is required." },
      {
        type: "min",
        value: 4,
        message: "Password must be at least 4 characters.",
      },
    ],
  };

  const [currentPage, setCurrentPage] = useState(0);

  function addPage() {
    setCurrentPage(currentPage + 1);
  }

  return (
    <>
      <View
        style={tailwindClasses(
          "flex flex-row justify-between items-center mb-3",
        )}
      >
        <View
          style={tailwindClasses(
            "text-main bg-base-white flex h-8 w-8 items-center justify-center rounded-full",
          )}
        >
          <Text>{currentPage}</Text>
        </View>
        <Button
          className="btn-primary-outline ml-auto btn-sm block"
          onPress={addPage}
        >
          Add Page
        </Button>
      </View>

      <FilePicker
        onSelected={setPostMedia}
        maxFiles={1}
        className="h-56 text-main flex flex-row justify-center items-center text-center h-56 border-gray-600 mb-4 rounded-lg border"
      >
        {placeholderFiles.length ? (
          <FilePreview
            removable={false}
            files={placeholderFiles}
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
        value={post.text as string}
        validationRules={validation_rules.post}
        autoComplete="username"
        keyboardType="email-address"
        inputMode="text"
        textAlignVertical="top"
        onChangeText={setPostText}
        multiline={true}
        numberOfLines={4}
        onValidationError={handleValidationError}
      />
    </>
  );
});

export default LongPostBuilder;
