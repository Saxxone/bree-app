import { memo } from "react";
import { Image, type ImageSource } from "expo-image";
import { styles } from "@/styles/main";
import createStyles from "@/services/ClassTransformer";

type Props = {
  readonly imgSource: ImageSource;
};

const ImageViewer = memo(({ imgSource }: Props) => {
  return (
    <Image
      source={imgSource}
      style={createStyles("rounded-lg w-full h-72 object-cover")}
    />
  );
});

export default ImageViewer;
