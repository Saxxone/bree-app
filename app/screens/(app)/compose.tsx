import { Pressable, View } from "react-native";
import tailwindClasses from "@/services/ClassTransformer";
import AppButton from "@/components/form/Button";
import PostDisplay from "@/components/post/PostDisplay";
import { Post, PostType } from "@/types/post";
import { Ionicons } from "@expo/vector-icons";
import SelectPostType from "@/components/post/SelectPostType";
import LongPostBuilder from "@/components/post/LongPostBuilder";
import FilePreview from "@/components/post/FilePreview";
import FormInput from "@/components/form/FormInput";
import { ValidationRule } from "@/hooks/useValidation";
import { useState } from "react";
import FilePicker from "@/components/app/FilePicker";
import AppText from "@/components/app/AppText";

export default function Compose() {
  const [post, setPost] = useState<Post>({
    id: "",
    text: "",
    postType: "SHORT",
    media: [],
    comments: [],
    likeCount: 0,
  });
  const [inputErrors, setInputErrors] = useState<Record<string, string> | null>(
    null,
  );

  //TODO make validation for one of two values to be present, i.e either media or text is required
  const validationRules: Record<string, ValidationRule[]> = {
    post: [
      { type: "required", message: "Password is required." },
      {
        type: "min",
        value: 4,
        message: "Password must be at least 4 characters.",
      },
    ],
  };

  const handleValidationError = (errors: Record<string, string> | null) => {
    setInputErrors(errors);
  };

  const validatePost = () => {
    if (!post) {
      setInputErrors({
        post: "Post text or media is required to create a post.",
      });
      return false;
    }
    setInputErrors(null);
    return true;
  };

  function setPostText(v: string) {
    setPost({ ...post, text: v });
  }

  function setPostMedia(media: string[]) {
    setPost({ ...post, media });
  }

  const is_comment = true;
  const has_parent = true;
  const is_fetching = true;
  const post_type: PostType = "SHORT";
  const parent_post: Post = {};

  return (
    <View style={tailwindClasses("container")}>
      {has_parent && is_comment && (
        <>
          <PostDisplay
            actions={is_comment}
            ellipsis={true}
            post={parent_post}
            isFetching={is_fetching}
          />
          <Ionicons
            name="ellipsis-vertical"
            size={16}
            style={[tailwindClasses("text-gray-400 mb-4")]}
          />
        </>
      )}

      {!is_comment && <SelectPostType />}

      {post_type === "SHORT" ? (
        <>
          <FilePreview removable={true} />
          <FormInput
            placeholder="What's on your mind?"
            value={post.text as string}
            validationRules={validationRules.post}
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
      ) : (
        <LongPostBuilder />
      )}

      <FilePicker onSelected={setPostMedia} />

      <View>
        {inputErrors
          ? Object.values(inputErrors).map((error, index) => (
              <AppText key={`${index}-error-message`}>{error}</AppText>
            ))
          : null}
      </View>
    </View>
  );
}
