import {
  amber_200,
  amber_700,
  blue_200,
  blue_700,
  green_100,
  green_500,
  rose_100,
  rose_500,
} from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { memo, useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tailwindClasses from "../../services/ClassTransformer";
import type { Snack } from "../../types/types";
import Text from "./Text";

interface Props {
  snack: Snack;
  onClose: () => void;
}

const SnackBar = memo(({ snack, onClose }: Props) => {
  const fade_anim = useRef(new Animated.Value(0)).current;
  const snack_style = styles[snack.type];
  const timer_ref = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (snack.visible) {
      Animated.timing(fade_anim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      timer_ref.current = setTimeout(() => {
        onClose();
      }, 3000);
    } else {
      Animated.timing(fade_anim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();

      if (timer_ref.current) {
        clearTimeout(timer_ref.current);
        timer_ref.current = null;
      }
    }

    return () => {
      if (timer_ref.current) {
        clearTimeout(timer_ref.current);
      }
    };
  }, [snack.visible, fade_anim, onClose]);

  return (
    <Animated.View
      style={[
        tailwindClasses("absolute top-2 left-5 right-5"),
        { opacity: fade_anim },
      ]}
    >
      <SafeAreaView>
        <View
          style={[
            tailwindClasses(
              "p-4 rounded-lg flex-row items-center justify-start",
            ),
            snack_style,
          ]}
        >
          <View>
            <Text
              style={{
                color: snack_style.color,
              }}
              className="break-word"
            >
              {snack.title}
            </Text>
            <Text
              style={{
                color: snack_style.color,
                fontSize: 14,
                fontWeight: "400",
              }}
              className="break-word"
            >
              {snack.message}
            </Text>
          </View>
          <Pressable style={tailwindClasses("ml-auto")} onPress={onClose}>
            <Ionicons
              name="close-outline"
              size={24}
              color={snack_style.color}
            />
          </Pressable>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
});

export default SnackBar;

const styles = StyleSheet.create({
  info: {
    backgroundColor: blue_200,
    color: blue_700,
  },
  error: {
    backgroundColor: rose_100,
    color: rose_500,
  },
  success: {
    backgroundColor: green_100,
    color: green_500,
  },
  warning: {
    backgroundColor: amber_200,
    color: amber_700,
  },
});
