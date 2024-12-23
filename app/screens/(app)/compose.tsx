import { View, ScrollView } from "react-native";
import tailwindClasses from "@/services/ClassTransformer";
import PostDisplay from "@/components/post/PostDisplay";
import { LongPostBlock, Post, PostType } from "@/types/post";
import { Ionicons } from "@expo/vector-icons";
import SelectPostType from "@/components/post/SelectPostType";
import LongPostBuilder from "@/components/post/LongPostBuilder";
import { useMemo, useState } from "react";
import { FetchMethod } from "@/types/types";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import api_routes from "@/constants/ApiRoutes";
import { ApiConnectService } from "@/services/ApiConnectService";
import Button from "@/components/form/Button";
import { useSnackBar } from "@/context/SnackBarProvider";
import ShortPostBuilder from "@/components/post/ShortPostBuilder";
import { app_routes } from "@/constants/AppRoutes";

export default function Compose() {
  const { id, is_comment } = useLocalSearchParams();
  const { snackBar, setSnackBar } = useSnackBar();
  const [post, setPost] = useState<Partial<Post>>({
    parentId: id as string,
    text: "",
    media: [],
    mediaTypes: [],
    type: "SHORT",
  });
  const [isPosting, setIsPosting] = useState(false);
  const [postType, setPostType] = useState<PostType>("SHORT");
  const [postCreationType, setPostCreationType] = useState<"draft" | "publish">(
    "publish",
  );

  const [inputErrors, setInputErrors] = useState<Record<string, string> | null>(
    null,
  );

  const { isFetching: is_fetching_parent, data: parent_post } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      return await ApiConnectService<Post>({
        url: id && api_routes.posts.getPostById(id as string),
        method: FetchMethod.GET,
      });
    },
    enabled: true,
    retry: false,
  });

  const {
    isFetching: is_creating_post,
    error: post_error,
    isError: is_post_error,
    refetch: createPost,
  } = useQuery({
    queryKey: ["new-post"],
    queryFn: async () => {
      return await ApiConnectService<Post>({
        url:
          postCreationType === "publish"
            ? api_routes.posts.create_post
            : api_routes.posts.create_draft,
        method: FetchMethod.POST,
        body: post,
      });
    },
    enabled: false,
    retry: false,
  });

  const handleValidationError = (errors: Record<string, string> | null) => {
    setInputErrors(errors);
  };

  function setLongPost(data: LongPostBlock[]) {
    setPost({ ...post, longPost: { content: data } });
  }

  function setShortPost(data: Partial<Post>) {
    setPost({ ...post, ...data });
  }

  function applyPostType(type: PostType) {
    setPostType(() => type);
    setPost({ ...post, type });
  }

  async function attemptCreatePost(type: "draft" | "publish") {
    const isShortPostEmpty =
      post.type === "SHORT" && !post.text && !post.media?.length;

    const isLongPostEmpty =
      post.type === "LONG" && !post?.longPost?.content?.length;

    if (isShortPostEmpty && isLongPostEmpty) {
      return;
    }

    setIsPosting(true);
    setPostCreationType(type);

    await createPost();

    if (is_post_error) {
      setSnackBar({
        ...snackBar,
        visible: true,
        message: post_error.message,
      });
    } else {
      if (is_comment) router.replace(app_routes.post.view(post.id));
      else router.replace(app_routes.post.home);
    }
    setIsPosting(false);
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
      }, [is_comment, parent_post, is_fetching_parent])}

      {!is_comment && (
        <SelectPostType type={postType} onSelected={applyPostType} />
      )}

      {postType === "SHORT" ? (
        <ShortPostBuilder
          post={post}
          setShortPost={setShortPost}
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
            disabled={isPosting || is_creating_post || !!inputErrors}
            className="btn-primary-outline btn-md text-white !px-8 rounded-lg"
            onPress={() => attemptCreatePost("draft")}
          >
            {"Draft"}
          </Button>
        )}
        <Button
          disabled={isPosting || is_creating_post || !!inputErrors}
          className="btn-primary btn-md font-regular text-white !px-8 rounded-lg"
          onPress={() => attemptCreatePost("publish")}
        >
          {is_comment ? "Reply" : "Post"}
        </Button>
      </View>
    </ScrollView>
  );
}
