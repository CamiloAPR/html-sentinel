const { runRegression } = require("./crawler");
const { projects } = require("./settings.json");
const { exec } = require("child_process");

const start = async () => {
  await runRegression(projects);

  exec("cd web && npm run start", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};
start();
