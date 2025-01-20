import Text from "@/app_directories/components/app/Text";
import { violet_400 } from "@/app_directories/constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { memo } from "react";
import { Image, View } from "react-native";
import tailwindClasses from "@/app_directories/services/ClassTransformer";
import { Post } from "../../types/post";

interface Props {
  post: Post;
}

const PostTop = memo(({ post }: Props) => {
  return (
    <>
      {post.parentId ? (
        <Ionicons
          name="arrow-undo"
          size={8}
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
          <Text className="text-xs text-gray-400">
            @{post.author?.username}
          </Text>
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
