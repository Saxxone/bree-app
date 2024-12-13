import { violet_400 } from "@/constants/Colors";
import transformClasses from "@/services/ClassTransformer";
import { Post } from "@/types/post";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { memo } from "react";
import AppText from "../app/AppText";
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
          style={transformClasses("text-gray-400 block mb-1")}
        />
      ) : null}
      <View style={transformClasses("flex-row items-start gap-2 mb-2")}>
        <Image
          source={{
            uri: post.author.img as string,
          }}
          style={transformClasses("avatar")}
        />
        <View>
          <AppText>{post.author.name}</AppText>
          <AppText>{post.author?.username}</AppText>
        </View>
        <MaterialIcons
          name="verified"
          size={16}
          color={violet_400}
          style={transformClasses("mt-1")}
        />
      </View>
    </>
  );
});

export default PostTop;
