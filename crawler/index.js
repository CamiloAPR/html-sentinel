const { writeFile, createDirectories } = require("./fs");
const format = require("html-format");

const puppeteer = require("puppeteer-extra");
const { checkoutBranch, logMessage, logExecResults } = require("./utils");

const BASE_URL_URL = "./web/public/snapshots/";

const runRegression = async (projects) => {
  const res = {};
  for (let i = 0; i < projects.length; i++) {
    const { id, repoPath, origin, target, paths } = projects[i];
    const versions = [origin, target];
    res[id] = {
      versions: {
        origin,
        target,
      },
      tests: { ...paths },
    };

    const tests = {};
    for (let j = 0; j < versions.length; j++) {
      const { domain, branch, name } = versions[j];

      if (repoPath && branch) {
        await checkoutBranch(repoPath, branch);
      }

      const savePath = composeSavePath([id, name]);
      createDirectories(savePath);

      await puppeteer
        .launch({ headless: true, args: ["--ignore-certificate-errors"] })
        .then(async (browser) => {
          const page = await browser.newPage();
          await page.setViewport({ width: 1440, height: 900 });
          await page.setDefaultNavigationTimeout(0);

          for (let k = 0; k < paths.length; k++) {
            const path = paths[k];
            const url = domain + path;
            logMessage(`Retrieving snapshot for: ${url}`);
            await page.goto(url, {
              waitUntil: "networkidle2",
              timeout: 30000,
            });
            const html = await page.content();
            const fileName = `${savePath}/${path.replace(
              /(\/|\?|\&)/g,
              "--"
            )}.html`;
            writeFile(
              fileName,
              format(html.replaceAll(domain, "%%SITEDOMAIN%%")),
              new Date().toJSON()
            );

            if (!tests.hasOwnProperty(path)) {
              tests[path] = {};
            }
            tests[path][name] = fileName;
          }
          await browser.close();
        });
    }

    res[id].tests = tests;
  }

  writeFile(
    `${BASE_URL_URL}/map.json`,
    JSON.stringify(res),
    new Date().toJSON()
  );
};

const composeSavePath = (dirs) => {
  return `${BASE_URL_URL}${dirs.join("/")}`;
};

module.exports = { runRegression };
