import { View } from "react-native";
import tailwindClasses from "@/services/ClassTransformer";
import PostDisplay from "@/components/post/PostDisplay";
import { Post, PostType } from "@/types/post";
import { Ionicons } from "@expo/vector-icons";
import SelectPostType from "@/components/post/SelectPostType";
import LongPostBuilder from "@/components/post/LongPostBuilder";
import FilePreview from "@/components/post/FilePreview";
import FormInput from "@/components/form/FormInput";
import { ValidationRule } from "@/hooks/useValidation";
import { useMemo, useState } from "react";
import FilePicker from "@/components/app/FilePicker";
import Text from "@/components/app/Text";
import SnackBar from "@/components/app/SnackBar";
import { Snack, FetchMethod } from "@/types/types";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import api_routes from "@/constants/ApiRoutes";
import { ApiConnectService } from "@/services/ApiConnectService";
import Button from "@/components/form/Button";

export default function Compose() {
  const { id, is_comment } = useLocalSearchParams();

  const {
    isFetching: is_fetching_parent,

    data: parent_post,
    refetch: refetchParentPost,
  } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      return await ApiConnectService<Post>({
        url: api_routes.posts.getPostById(id as string),
        method: FetchMethod.GET,
      });
    },
    enabled: true,
    retry: false,
  });

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

  const [snackBar, setSnackBar] = useState<Snack>({
    visible: false,
    title: "",
    message: "",
    type: "error",
  });

  const [inputErrors, setInputErrors] = useState<Record<string, string> | null>(
    null,
  );

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

  const handleValidationError = (errors: Record<string, string> | null) => {
    setInputErrors(errors);
  };

  // const validatePost = () => {
  //   if (!post) {
  //     setInputErrors({
  //       post: "Post text or media is required to create a post.",
  //     });
  //     return false;
  //   }
  //   setInputErrors(null);
  //   return true;
  // };

  function setPostText(v: string) {
    setPost({ ...post, text: v });
  }

  function setPostMedia(media: string[]) {
    setPost({ ...post, media });
  }

  const post_type: PostType = "SHORT";

  const [isPosting, setIsPosting] = useState(false); // State to track posting status

  function attemptCreatePost(type: "draft" | "publish") {
    setIsPosting(true); // Disable buttons while posting

    console.log("Attempting to create post of type:", type);
    // ... your API call logic ...
  }

  return (
    <View style={tailwindClasses("container")}>
      {useMemo(() => {
        return (
          is_comment &&
          parent_post?.data && (
            <>
              <PostDisplay
                actions={false}
                ellipsis={true}
                post={parent_post?.data}
                isFetching={is_fetching_parent}
              />
              <Ionicons
                name="ellipsis-vertical"
                size={16}
                style={[tailwindClasses("text-gray-400 mb-4")]}
              />
            </>
          )
        );
      }, [is_comment, parent_post, is_fetching_parent, refetchParentPost])}

      {!is_comment && <SelectPostType />}

      {post_type === "SHORT" ? (
        <>
          <FilePreview removable={true} />
          <FormInput
            placeholder={
              is_comment ? "Reply to this post" : "What's on your mind?"
            }
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
      ) : (
        <LongPostBuilder />
      )}

      <FilePicker onSelected={setPostMedia} />

      <View
        style={tailwindClasses(
          "mt-4 flex flex-row items-center space-4 justify-end",
        )}
      >
        <Button
          disabled={isPosting || is_fetching_parent || !!inputErrors}
          className="btn-primary-outline btn-md text-white !px-8 rounded-lg"
          onPress={() => attemptCreatePost("draft")}
        >
          {isPosting ? (
            <Ionicons
              name="refresh"
              size={16}
              color="white"
              style={tailwindClasses("mt-2")}
            />
          ) : null}
          {"Draft"}
        </Button>
        <Button
          disabled={isPosting || is_fetching_parent || !!inputErrors}
          className="btn-primary btn-md font-regular text-white !px-8 rounded-lg"
          onPress={() => attemptCreatePost("publish")}
        >
          {isPosting ? (
            <Ionicons
              name="refresh"
              size={16}
              color="white"
              style={tailwindClasses("mt-2")}
            />
          ) : null}
          {is_comment ? "Reply" : "Post"}
        </Button>
      </View>

      <SnackBar
        snack={snackBar}
        onClose={() => setSnackBar({ ...snackBar, visible: false })}
      />
      <View>
        {inputErrors
          ? Object.values(inputErrors).map((error) => (
              <Text key={`${error}-error-message`}>{error}</Text>
            ))
          : null}
      </View>
    </View>
  );
}
