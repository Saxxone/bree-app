import { gray_600, gray_700 } from "@/app-directories/constants/Colors";
import { Animated } from "react-native";
import tailwindClasses from "@/app-directories/services/ClassTransformer";

interface Props {
  width: string;
  height: string;
  radius: string;
  readonly className?: string;
}

const SkeletonLoader = ({ width, height, radius, className }: Props) => {
  const animatedValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }),
  ).start();

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [gray_700, gray_600],
  });

  return (
    <Animated.View
      style={[
        tailwindClasses(`${width} ${height} ${radius} ${className}`),
        { backgroundColor },
      ]}
    />
  );
};

export default SkeletonLoader;
