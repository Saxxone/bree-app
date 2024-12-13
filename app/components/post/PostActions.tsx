import { useMemo, memo } from "react";
import { Post } from "@/types/post";
import { Pressable, View, useColorScheme } from "react-native";
import transformClasses from "@/services/ClassTransformer";
import Ionicons from "@expo/vector-icons/Ionicons";
import AppText from "../app/AppText";

type Props = {
  readonly post: Post;
  readonly className?: string;
};
type IconName =
  | "heart-outline"
  | "arrow-undo-outline"
  | "share-social-outline"
  | "bookmark-outline";

interface Action {
  icon: IconName;
  key?: keyof Post;
  active: boolean;
  command: () => void;
}

const PostActions = memo(({ post, className }: Props) => {
  const classes = useMemo(() => transformClasses(className ?? ""), [className]);
  const color_scheme = useColorScheme();
  const color = color_scheme === "dark" ? "text-gray-300" : "text-gray-500";

  console.log(color);

  function likePost() {
    console.log("like");
  }

  function comment() {
    console.log("comment");
  }

  function sharePost() {
    console.log("share");
  }

  function bookmarkPost() {
    console.log("bookmark");
  }

  const actions = useMemo<Action[]>(
    () => [
      {
        icon: "heart-outline",
        key: "likeCount",
        active: post?.likedByMe,
        command: likePost,
      },
      {
        icon: "arrow-undo-outline",
        key: "commentCount",
        active: false,
        command: comment,
      },
      {
        icon: "share-social-outline",
        active: false,
        command: sharePost,
      },
      {
        icon: "bookmark-outline",
        key: "bookmarkCount",
        active: post?.bookmarkedByMe,
        command: bookmarkPost,
      },
    ],
    [post],
  );
  return (
    <View
      style={[
        transformClasses("flex flex-row w-full items-center mt-2"),
        classes,
      ]}
    >
      {actions.map((action, index) => (
        <Pressable
          key={action.icon + action.key + post.id}
          onPress={(e) => {
            e.stopPropagation();
            action.command();
          }}
          style={[
            transformClasses("px-1 flex flex-row items-center cursor-pointer"),
            index === 2
              ? transformClasses("ml-auto mr-1")
              : transformClasses("mr-1"),
          ]}
        >
          <Ionicons
            name={action.icon}
            size={16}
            style={[
              action.active && action.key === "likeCount"
                ? transformClasses("text-red-500")
                : action.active && action.key !== "likeCount"
                  ? transformClasses("text-purple-500")
                  : transformClasses(color),
            ]}
          />
          {action.key && post[action.key as keyof Post] ? (
            <AppText style={transformClasses("ml-1 text-sm font-light")}>
              {String(post[action.key as keyof Post])}
            </AppText>
          ) : null}
        </Pressable>
      ))}
    </View>
  );
});

export default PostActions;
