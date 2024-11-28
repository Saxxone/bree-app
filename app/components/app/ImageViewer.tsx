import { memo } from "react";
import { Image, type ImageSource } from "expo-image";
import { styles } from "@/styles/main";

type Props = {
  readonly imgSource: ImageSource;
};

const ImageViewer = memo(({ imgSource }: Props) => {
  return <Image source={imgSource} style={styles.image} />;
});

export default ImageViewer;
