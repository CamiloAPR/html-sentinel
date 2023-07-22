import "./App.css";
import { useState, useEffect } from "react";
import FileDiff from "./components/FileDiff";
const App = () => {
  const [projects, setProjects] = useState([]);
  const [test, setTest] = useState(null);
  useEffect(() => {
    const fetchSettings = async () => {
      setProjects([]);
      const settingsResponse = await fetch(
        `${process.env.PUBLIC_URL}/snapshots/map.json`,
        { method: "GET" }
      );
      const tmp = await settingsResponse.json();
      const keys = Object.keys(tmp);

      for (let i = 0; i < keys.length; i++) {
        const projectName = keys[i];
        const { versions, tests } = tmp[projectName];
        const { name: originName } = versions.origin;
        const { name: targetName } = versions.target;
        let res = [];
        const paths = Object.keys(tests);
        for (let j = 0; j < paths.length; j++) {
          const test = tests[paths[i]];
          const [originHTML, targetHTML] = await fetchHtml(
            `${test[originName].split("public")[1]}`,
            `${test[targetName].split("public")[1]}`
          );
          res.push({
            origin: originHTML,
            target: targetHTML,
            path: paths[j],
            diffCount: countDiff(originHTML, targetHTML),
          });
        }
        setProjects([...projects, { projectName, files: res }]);
        console.log(projects);
      }
    };

    fetchSettings();
  }, []);

  return (
    <div className="App">
      <h1>HTML Sentinel Report</h1>
      <section>
        <div className="projects">
          {!!projects &&
            projects.map(({ projectName, files }) => (
              <div key={projectName} className="project">
                <h2>{projectName}</h2>
                {files.map((file) => (
                  <div
                    className="test"
                    key={file.path}
                    onClick={() => setTest(file)}
                  >
                    <span>
                      {file.path}
                      <span className="diffs">{file.diffCount}</span>
                    </span>
                  </div>
                ))}
              </div>
            ))}
        </div>
        {test && (
          <div className="file-diff-wrapper">
            <FileDiff
              oldCode={test.origin}
              newCode={test.target}
              fileName={test.path}
            />
          </div>
        )}
      </section>
    </div>
  );
};

// create a function to fetch the html from the server
const fetchHtml = async (oldUrl, newUrl) => {
  let files = [oldUrl, newUrl];
  let res = [];

  for (let i = 0; i < files.length; i++) {
    let response = await fetch(files[i]);
    let html = await response.text();
    res.push(html);
  }

  return await res;
};

// count different lines between two strings
const countDiff = (oldCode, newCode) => {
  if (!oldCode || !newCode) return 0;
  const oldLines = oldCode.split("\n");
  const newLines = newCode.split("\n");
  let diff = 0;
  for (let i = 0; i < oldLines.length; i++) {
    if (oldLines[i] !== newLines[i]) {
      diff++;
    }
  }
  return diff;
};

export default App;
