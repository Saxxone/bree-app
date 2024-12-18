import { View, ScrollView } from "react-native";
import tailwindClasses from "@/services/ClassTransformer";
import PostDisplay from "@/components/post/PostDisplay";
import { LongPost, Post, PostType } from "@/types/post";
import { Ionicons } from "@expo/vector-icons";
import SelectPostType from "@/components/post/SelectPostType";
import LongPostBuilder from "@/components/post/LongPostBuilder";
import { useMemo, useState } from "react";
import Text from "@/components/app/Text";
import { FetchMethod } from "@/types/types";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import api_routes from "@/constants/ApiRoutes";
import { ApiConnectService } from "@/services/ApiConnectService";
import Button from "@/components/form/Button";
import { useSnackBar } from "@/context/SnackBarProvider";
import ShortPostBuilder from "@/components/post/ShortPostBuilder";

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

  const { snackBar, setSnackBar } = useSnackBar();

  const [inputErrors, setInputErrors] = useState<Record<string, string> | null>(
    null,
  );

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

  function setLongPost(data: any) {
    console.log(data);
    setPost({ ...post, longPost: { content: data } });
    console.log(post);
  }

  const [isPosting, setIsPosting] = useState(false);
  const [postType, setPostType] = useState<PostType>("LONG");

  function attributePostType(type: PostType) {
    setPostType(() => type);
  }

  function attemptCreatePost(type: "draft" | "publish") {
    setIsPosting(true); // Disable buttons while posting

    console.log("Attempting to create post of type:", type);
    // ... your API call logic ...
  }

  return (
    <ScrollView style={tailwindClasses("container")}>
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

      {!is_comment && (
        <SelectPostType type={postType} onSelected={attributePostType} />
      )}

      {postType === "SHORT" ? (
        <ShortPostBuilder
          setPostText={setPostText}
          post={post}
          is_comment={Number(is_comment)}
        />
      ) : (
        <LongPostBuilder post={post.longPost} setLongPost={setLongPost} />
      )}

      <View
        style={tailwindClasses(
          "mt-4 flex flex-row items-center space-4 justify-end",
        )}
      >
        {!is_comment && (
          <Button
            disabled={isPosting || is_fetching_parent || !!inputErrors}
            className="btn-primary-outline btn-md text-white !px-8 rounded-lg"
            onPress={() => attemptCreatePost("draft")}
          >
            {"Draft"}
          </Button>
        )}
        <Button
          disabled={isPosting || is_fetching_parent || !!inputErrors}
          className="btn-primary btn-md font-regular text-white !px-8 rounded-lg"
          onPress={() => attemptCreatePost("publish")}
        >
          {is_comment ? "Reply" : "Post"}
        </Button>
      </View>

      {
        <View>
          {inputErrors
            ? Object.values(inputErrors).map((error) => (
                <Text key={`${error}-error-message`}>{error}</Text>
              ))
            : null}
        </View>
      }
    </ScrollView>
  );
}
