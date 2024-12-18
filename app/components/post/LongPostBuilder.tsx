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

interface Props {
  post: Partial<LongPost> | null | undefined;
  setLongPost: (data: any) => void;
}

const LongPostBuilder = memo(({ ...props }: Props) => {
  const [placeholderFiles, setPlaceholderFiles] = useState<
    ImagePicker.ImagePickerAsset[]
  >([]);

  const [contents, setContents] = useState([
    { text: "", media: [], files: [] },
  ]);

  const [inputErrors, setInputErrors] = useState<Record<string, string> | null>(
    null,
  );

  function setPostText(v: string, index: number) {
    const new_contents = [...contents];
    new_contents[index].text = v;
    setContents(new_contents);
    props.setLongPost(new_contents);
  }

  function setPostMedia(
    data: { paths: string[]; files: ImagePicker.ImagePickerAsset[] },
    index: number,
  ) {
    const new_contents = [...contents];
    new_contents[index].media = data.paths;
    new_contents[index].files = data.files;
    setContents(new_contents);
    props.setLongPost(new_contents);
  }

  function removeFile(index: number) {
    const newFiles = [...placeholderFiles];
    newFiles.splice(index, 1);
    setPlaceholderFiles(newFiles);
    // props.setLongPost(newContents);
  }

  const handleValidationError = (errors: Record<string, string> | null) => {
    setInputErrors(errors);
  };

  //TODO make validation for one of two values to be present, i.e either media or text is required
  const validation_rules: Record<string, ValidationRule[]> = {
    post: [
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
          <Text>{currentPage + 1}</Text>
        </View>
        <Button
          className="btn-primary-outline ml-auto btn-sm block"
          onPress={addPage}
        >
          Add Page
        </Button>
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
              <PagerViewIndicator
                currentPage={currentPage}
                length={contents.length}
                className="mb-4"
              />
              <FilePicker
                onSelected={(media) => setPostMedia(media, index)}
                maxFiles={1}
                ratio={[5, 3]}
                className="h-56 text-main  flex flex-row justify-center items-center text-center border-gray-600 mb-4 rounded-lg border"
              >
                {content.files ? (
                  <FilePreview
                    removable={false}
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
                validationRules={validation_rules.post}
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
