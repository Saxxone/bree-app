import { Image } from "expo-image";
import { memo } from "react";
import tailwindClasses from "@/app-directories/services/ClassTransformer";

type Props = {
  readonly source: string;
  readonly placeholder?: string;
};

const ImageViewer = memo(({ source, placeholder }: Props) => {
  return (
    <Image
      source={{
        uri: source,
      }}
      autoplay={true}
      placeholder={placeholder}
      contentFit="cover"
      style={[tailwindClasses("rounded-lg w-full h-full object-cover")]}
    />
  );
});

export default ImageViewer;
