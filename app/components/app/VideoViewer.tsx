import { memo } from "react";
import { StyleSheet } from "react-native";
import { useRef, useState } from "react";
import { Video, ResizeMode } from "expo-av";

type Props = {
  readonly uri: string;
};

const VideoViewer = memo(({ uri }: Props) => {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  return (
    <Video
      ref={video}
      style={styles.video}
      source={{
        uri: uri,
      }}
      useNativeControls
      resizeMode={ResizeMode.CONTAIN}
      isLooping
      onPlaybackStatusUpdate={(status) => setStatus(() => status)}
    />
  );
});

export default VideoViewer;

const styles = StyleSheet.create({
  video: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
