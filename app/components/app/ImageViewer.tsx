import { Image, type ImageSource } from "expo-image";
import { styles } from "@/styles/main";

type Props = {
  readonly imgSource: ImageSource;
};

export function ImageViewer({ imgSource }: Props) {
  return <Image source={imgSource} style={styles.image} />;
}
