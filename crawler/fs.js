const fs = require("fs");
const { logMessage } = require("./utils");

const writeFile = (file, content, currDate) => {
  fs.writeFile(file, content, function (err) {
    if (err) {
      logMessage(
        `An error happened while trying to write ${file}. Stacktrace:\n ${err}`,
        "ERROR"
      );
    } else {
      logMessage(`${file} was succesfully added.`);
    }
  });
};

const createDirectories = (path) => {
  if (fs.existsSync(path)) {
    fs.rmdirSync(path, { recursive: true });
  }
  fs.mkdirSync(path, { recursive: true });
};

module.exports = { writeFile, createDirectories };
