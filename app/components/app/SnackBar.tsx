import type { Snack } from "~/types/types";
import { View, StyleSheet, Animated, Pressable } from "react-native";
import { memo, useEffect, useRef } from "react";
import AppText from "./AppText";
import {
  blue_700,
  rose_500,
  amber_700,
  blue_200,
  amber_200,
  rose_100,
  green_100,
  green_500,
} from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import tailwindClasses from "@/services/ClassTransformer";

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
  }, [snack.visible, onClose]);

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
            <AppText
              style={{
                color: snack_style.color,
              }}
              className="break-word"
            >
              {snack.title}
            </AppText>
            <AppText
              style={{
                color: snack_style.color,
                fontSize: 14,
                fontWeight: "400",
              }}
              className="break-word"
            >
              {snack.message}
            </AppText>
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
