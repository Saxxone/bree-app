import { violet_400 } from "@/constants/Colors";
import tailwindClasses from "@/services/ClassTransformer";
import { Post } from "@/types/post";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { memo } from "react";
import Text from "../app/Text";
import { View, Image } from "react-native";

interface Props {
  post: Post;
}

const PostTop = memo(({ post }: Props) => {
  return (
    <>
      {post.parentId ? (
        <Ionicons
          name="arrow-undo"
          size={12}
          style={tailwindClasses("text-gray-400 block mb-1")}
        />
      ) : null}
      <View style={tailwindClasses("flex-row items-start gap-2 mb-2")}>
        <Image
          source={{
            uri: post.author?.img as string,
          }}
          style={tailwindClasses("avatar")}
        />
        <View>
          <Text>{post.author?.name}</Text>
          <Text>@{post.author?.username}</Text>
        </View>
        <MaterialIcons
          name="verified"
          size={16}
          color={violet_400}
          style={tailwindClasses("mt-0.5")}
        />
      </View>
    </>
  );
});

export default PostTop;
