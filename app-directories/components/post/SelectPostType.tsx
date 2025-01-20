import Button from "@/app-directories/components/form/Button";
import { PostType } from "@/app-directories/types/post";
import { memo } from "react";
import { useColorScheme, View } from "react-native";
import tailwindClasses from "@/app-directories/services/ClassTransformer";

interface Props {
  type: PostType;
  onSelected: (type: PostType) => void;
}

const SelectPostType = memo(({ ...props }: Props) => {
  const color_scheme = useColorScheme();

  const bg_base_light = color_scheme === "dark" ? "bg-gray-800" : "bg-gray-100";
  const bg_base_white = color_scheme === "dark" ? "bg-gray-700" : "bg-gray-200";

  const post_types: { type: PostType; label: string }[] = [
    { type: "SHORT", label: "Create Short Post" },
    { type: "LONG", label: "Create Long Post" },
  ];
  return (
    <View
      style={tailwindClasses(
        bg_base_white +
          " mb-4 p-1 border border-gray-600 rounded-lg flex flex-row gap-3 justify-items-between items-center",
      )}
    >
      {post_types.map((post_type) => {
        return (
          <Button
            key={post_type.type + "-post-style"}
            className={
              props.type === post_type.type ? bg_base_light : bg_base_white
            }
            style={tailwindClasses("py-2 px-4 text-sm flex-1")}
            onPress={() => props.onSelected(post_type.type)}
          >
            {post_type.label}
          </Button>
        );
      })}
    </View>
  );
});

export default SelectPostType;
