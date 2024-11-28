import { memo } from "react";
import { ImageViewer } from "@/components/app/ImageViewer";
import { VideoViewer } from "@/components/app/VideoViewer";
import { Post } from "@/types/post";

type Props = {
  readonly post: Post;
};

function MediaViewer({ post }: Props) {
  const posts = post.media.map((m, index) => {
    return post.mediaTypes[index] === "image" ? (
      <ImageViewer
        imgSource={{
          uri: m as string,
        }}
        key={`${m.toString()}-${index}-${post.id}`}
      />
    ) : (
      <VideoViewer
        uri={m as string}
        key={`${m.toString()}-${index}-${post.id}`}
      />
    );
  });

  const view = useMemo(() => posts, [post])
  
  return view;
}

export default const MediaViewer = memo(MediaViewer)