import createStyles from "@/services/ClassTransformer";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { View } from "react-native";

interface Props {
  source: string;
  controls?: boolean;
  autoplay?: boolean;
}

export default function VideoScreen({ source }: Props) {
  const player = useVideoPlayer(source, (player) => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <View style={createStyles("mx-auto flex items-center justify-center")}>
      <VideoView
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        contentFit="cover"
        style={[createStyles("rounded-lg w-full h-full object-cover")]}
      />
    </View>
  );
}
