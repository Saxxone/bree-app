import { ImageViewer } from "@/components/app/ImageViewer";
import { VideoViewer } from "@/components/app/VideoViewer";
import { Post } from "@/types/post";

type Props = {
  readonly post: Post;
};

export default function MediaViewer({ post }: Props) {
  const view = post.media.map((m, index) => {
    return post.mediaTypes[index] === "image" ? (
      <ImageViewer
        imgSource={{
          uri: m as string,
        }}
        key={`${m.toString()}-${index}-${post.id}`}
      />
    ) : (
      <VideoViewer uri={m as string} key={`${m.toString()}-${index}-${post.id}`} />
    );
  });
  return view;
}
