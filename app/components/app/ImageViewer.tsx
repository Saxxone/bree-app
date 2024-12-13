import { memo } from "react";
import { Image } from "expo-image";
import tailwindClasses from "@/services/ClassTransformer";

type Props = {
  readonly source: string;
};

const ImageViewer = memo(({ source }: Props) => {
  return (
    <Image
      source={{
        uri: source,
      }}
      autoplay={true}
      contentFit="cover"
      style={[tailwindClasses("rounded-lg w-full h-full object-cover")]}
    />
  );
});

export default ImageViewer;
