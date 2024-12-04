import type { Snack } from "~/types/types";
import { View, StyleSheet, Animated, Pressable } from "react-native";
import { memo, useEffect, useRef } from "react";
import AppText from "./AppText";
import {
  blue_700,
  rounded_lg,
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
import createStyles from "@/services/ClassTransformer";

interface Props {
  snack: Snack;
  onClose: () => void;
}

const SnackBar = memo(({ snack, onClose }: Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const snackStyle = styles[snack.type];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (snack.visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      timerRef.current = setTimeout(() => {
        onClose();
      }, 3000);
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();

      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [snack.visible, onClose]);

  return (
    <Animated.View
      style={[
        createStyles("absolute top-5 left-5 right-5"),
        { opacity: fadeAnim },
      ]}
    >
      <SafeAreaView>
        <View style={[styles.generic, snackStyle]}>
          <View>
            <AppText
              style={{
                color: snackStyle.color,
              }}
              className="break-word"
            >
              {snack.title}
            </AppText>
            <AppText
              style={{
                color: snackStyle.color,
                fontSize: 14,
                fontWeight: "400",
              }}
              className="break-word"
            >
              {snack.message}
            </AppText>
          </View>
          <Pressable style={createStyles("ml-auto")} onPress={onClose}>
            <Ionicons name="close-outline" size={24} color={snackStyle.color} />
          </Pressable>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
});

export default SnackBar;

const styles = StyleSheet.create({
  generic: {
    padding: 16,
    borderRadius: rounded_lg,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "flex-start",
  },
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
