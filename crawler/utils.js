
const {execSync} = require("child_process");


const sanitizeText = (text = '', whitespace = '+') => {
    return text.toLowerCase().replace(/\s/gi, whitespace);
}

const checkoutBranch = (repoPath, branchName) => {
    //TODO stash changes
  execSync(`cd ${repoPath} && git checkout ${branchName}`);
};

const logExecResults = (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
};

/*
Params
  text:  Log content.
  label: Label or level of the log. Suggested values: INFO, WARN, ERROR
  date:  Date of the log.
*/
const logMessage = (text = '', label = 'INFO', date = null) => {
    if (date === null) {
      date = new Date().toJSON();
    }
  
    let logContent = `[${date}] [${label.toUpperCase()}] ${text}`;
  
    if (label.toUpperCase() === 'ERROR') {
      console.error(logContent);
    }
    else {
      console.info(logContent);
    }
  }

module.exports = {checkoutBranch, logMessage, sanitizeText, logExecResults};