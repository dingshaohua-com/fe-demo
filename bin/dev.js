import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

// 启动子项目
const subAppsDir = path.resolve("src", "apps", "sub-app");
const subApps = fs.readdirSync(subAppsDir, { withFileTypes: true });
subApps.forEach((subApp) => {
  const ignoreDir = [".DS_Store"];
  if (ignoreDir.includes(subApp.name)) return false;
  const subAppPath = path.resolve(subApp.parentPath, subApp.name);
  spawn("npm run", ["--prefix", subAppPath, "dev"], {
    stdio: "inherit",
    shell: true,
  });
});

// 启动主项目
const mainAppPath = path.resolve("src", "apps", "main-app");
spawn("npm run", ["--prefix", mainAppPath, "dev"], {
  stdio: "inherit",
  shell: true,
});
