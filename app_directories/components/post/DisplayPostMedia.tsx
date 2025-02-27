import { memo, useMemo } from "react";
import { Pressable, View } from "react-native";
import tailwindClasses from "@/app_directories/services/ClassTransformer";
import ImageViewer from "../app/ImageViewer";
import VideoViewer from "../app/VideoViewer";

interface Props {
  media: string[];
  mediaTypes: string[];
  readonly className?: string;
  postId: string;
}

const SocialDisplayPostMedia = memo(
  ({ media, className, mediaTypes, postId }: Props) => {
    const classes = useMemo(
      () => tailwindClasses(className ?? ""),
      [className],
    );

    const dynamicGridClasses = useMemo(() => {
      switch (media.length) {
        case 1:
          return "grid-cols-1";
        case 2:
          return "grid-cols-2 p-1";
        case 3:
          return "grid-cols-2 p-1";
        default:
          return "grid-cols-2 p-1 grid-rows-2";
      }
    }, [media]);

    function dynamicGridRows(index: number) {
      if (index === 0 && media.length === 3) return "row-span-2";
      if (index >= 1 && index <= 2 && media.length === 3) return "row-span-1";
      else return "";
    }

    async function selectMedia(index: number) {
      // await router.push({
      //   path: app_routes.post.view_media,
      //   query: { media: index, postId: postId },
      // });
    }
    return (
      <View
        style={[
          tailwindClasses(
            "rounded-lg h-64 overflow-hidden flex flex-row flex-wrap",
          ),
          classes,
        ]}
      >
        {media.map((m, index) => (
          <View
            key={m + index}
            style={[
              tailwindClasses(dynamicGridClasses),
              tailwindClasses(dynamicGridRows(index)),
            ]}
          >
            <Pressable
              key={m + index}
              onPress={() => selectMedia(index)}
              style={[
                tailwindClasses(
                  "overflow-hidden rounded-lg block cursor-pointer",
                ),
              ]}
            >
              {mediaTypes?.[index] === "image" ? (
                <ImageViewer source={m} />
              ) : (
                <VideoViewer source={m} controls={false} autoplay={true} />
              )}
            </Pressable>
          </View>
        ))}
      </View>
    );
  },
);

export default SocialDisplayPostMedia;
