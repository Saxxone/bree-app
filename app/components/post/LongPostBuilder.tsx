import { memo } from "react";
import Text from "../app/Text";
import FilePicker from "../app/FilePicker";
import FilePreview from "./FilePreview";

const LongPostBuilder = memo(() => {
  const content = [];
  function setPostMedia(media: string[]) {
    content.push(media);
  }
  return (
    <FilePicker onSelected={setPostMedia}>
      {content.length ? (
        <FilePreview removable={false} />
      ) : (
        <Text>Select Files to Upload</Text>
      )}
    </FilePicker>
  );
});

export default LongPostBuilder;
