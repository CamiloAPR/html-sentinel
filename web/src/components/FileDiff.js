import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";

const FileDiff = ({
  oldCode,
  newCode,
  oldTitle = "Before",
  newTitle = "After",
  fileName = "",
}) => {
  return (
    <div>
      <h2>{fileName}</h2>
      <ReactDiffViewer
        extraLinesSurroundingDiff={1}
        leftTitle={oldTitle}
        rightTitle={newTitle}
        oldValue={oldCode}
        newValue={newCode}
        splitView={true}
        compareMethod={DiffMethod.LINES}
        useDarkTheme={true}
      />
    </div>
  );
};

export default FileDiff;
