import { View, ScrollView } from "react-native";
import tailwindClasses from "@/services/ClassTransformer";
import PostDisplay from "@/components/post/PostDisplay";
import { Post, PostType } from "@/types/post";
import { Ionicons } from "@expo/vector-icons";
import SelectPostType from "@/components/post/SelectPostType";
import LongPostBuilder from "@/components/post/LongPostBuilder";
import { useMemo, useState } from "react";
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

  const [post, setPost] = useState<Partial<Post>>({});

  const { snackBar, setSnackBar } = useSnackBar();

  const [inputErrors, setInputErrors] = useState<Record<string, string> | null>(
    null,
  );

  const handleValidationError = (errors: Record<string, string> | null) => {
    setInputErrors(errors);
  };

  function setPostText(v: string) {
    setPost({ ...post, text: v });
  }

  function setLongPost(data: any) {
    console.log(inputErrors);
    setPost({ ...post, longPost: { content: data } });
  }

  const [isPosting, setIsPosting] = useState(false);
  const [postType, setPostType] = useState<PostType>("LONG");

  function attributePostType(type: PostType) {
    setPostType(() => type);
  }

  function attemptCreatePost(type: "draft" | "publish") {
    setIsPosting(true); // Disable buttons while posting

    console.log("Attempting to create post of type:", type, post);
    setSnackBar({
      ...snackBar,
      visible: true,
    });
    // ... your API call logic ...
  }

  return (
    <ScrollView style={tailwindClasses("container")}>
      {useMemo(() => {
        return (
          is_comment &&
          parent_post?.data?.id && (
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
          onValidationError={handleValidationError}
        />
      ) : (
        <LongPostBuilder
          post={post.longPost}
          setLongPost={setLongPost}
          onValidationError={handleValidationError}
        />
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
    </ScrollView>
  );
}
