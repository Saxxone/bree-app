import { memo } from "react";
import { Image } from "expo-image";
import tailwindClasses from "@/services/ClassTransformer";

type Props = {
  readonly source: string;
  readonly placeholder?: string;
};

const ImageViewer = memo(({ source, placeholder }: Props) => {
  console.log(placeholder);
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
