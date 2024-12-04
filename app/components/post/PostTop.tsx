import { violet_400 } from "@/constants/Colors";
import createStyles from "@/services/ClassTransformer";
import { Post } from "@/types/post";
import { MaterialIcons } from "@expo/vector-icons";
import { memo } from "react";
import AppText from "../app/AppText";
import { View, Image } from "react-native";

interface Props {
  post: Post;
}

const PostTop = memo(({ post }: Props) => {
  return (
    <View style={createStyles("flex-row items-start gap-2 mb-2")}>
      <Image
        source={{
          uri: post.author.img as string,
        }}
        style={createStyles("avatar")}
      />
      <View>
        <AppText>{post.author.name}</AppText>
        <AppText>{post.author?.username}</AppText>
      </View>
      <MaterialIcons
        name="verified"
        size={16}
        color={violet_400}
        style={createStyles("mt-1")}
      />
    </View>
  );
});

export default PostTop;
