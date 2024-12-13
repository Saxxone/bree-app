import { memo } from "react";
import AppText from "../app/AppText";
import FilePicker from "../app/FilePicker";
import FilePreview from "./FilePreview";

const LongPostBuilder = memo(() => {
  const content = [];
  function setPostMedia(media: string[]) {
    content.push(media);
  }
  return (
    <>
      <FilePicker onSelected={setPostMedia}>
        {content.length ? (
          <FilePreview removable={false} />
        ) : (
          <AppText>Select Files to Upload</AppText>
        )}
      </FilePicker>
    </>
  );
});

export default LongPostBuilder;
