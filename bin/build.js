import fs from "node:fs";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import fsExtra from "fs-extra/esm";

const projectRoot = path.resolve(process.cwd());
const rootDist = path.resolve(projectRoot, "dist");

// 打包主项目
const mainAppPath = path.resolve("src", "apps", "main-app");
spawnSync("npm run", ["--prefix", mainAppPath, "build"], {
  stdio: "inherit",
  shell: true,
});
const mainAppDist = path.resolve(mainAppPath, "dist");
fsExtra.moveSync(mainAppDist, rootDist, { overwrite: true });

// 打包子项目
const subAppsDir = path.resolve("src", "apps", "sub-app");
const subApps = fs.readdirSync(subAppsDir, { withFileTypes: true });
subApps.forEach((subApp) => {
  const ignoreDir = [".DS_Store"];
  if (ignoreDir.includes(subApp.name)) return false;
  const subAppPath = path.resolve(subApp.parentPath, subApp.name);
  spawnSync("npm run", ["--prefix", subAppPath, "build"], {
    stdio: "inherit",
    shell: true,
  });
  const subAppDist = path.resolve(subAppPath, "dist");
  const newSubDistPath = path.resolve(rootDist, subApp.name);
  fsExtra.moveSync(subAppDist, newSubDistPath, { overwrite: true });
});

// const args = process.argv.slice(2);
// const projectName = args[0];
// if(projectName === "app"){
//     fs.rmSync("dist", { recursive: true, force: true });
//     const webPath = path.resolve("src","apps","web");
//     const appPath = path.resolve("src","apps","app");
//     spawnSync("npm run", ["--prefix", webPath, "build"], { stdio: "inherit", shell: true });
//     spawn("npm run", ["--prefix", appPath, "build"], { stdio: "inherit", shell: true });
// }else if (projectName === "website") {
//     const projectPath = path.resolve("src", "apps", projectName);
//     spawn("npm run", ["--prefix", projectPath, "build"], {
//       stdio: "inherit",
//       shell: true,
//     });
//   } else {
//     console.log("Invalid project name");
//   }
