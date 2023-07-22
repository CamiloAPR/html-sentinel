import ReactDiffViewer from "react-diff-viewer";
import { useEffect, useState } from "react";

const FileDiff = ({
  oldCode,
  newCode,
  oldTitle = "Before",
  newTitle = "After",
  fileName = "",
}) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div>
      <h2>{fileName}</h2>
      <ReactDiffViewer
        styles={{ visibility: isOpened ? "visible" : "hidden" }}
        extraLinesSurroundingDiff={1}
        leftTitle={oldTitle}
        rightTitle={newTitle}
        oldValue={oldCode}
        newValue={newCode}
        splitView={true}
        useDarkTheme={true}
      />
    </div>
  );
};

export default FileDiff;
