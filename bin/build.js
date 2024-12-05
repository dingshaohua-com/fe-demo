import fs from "node:fs";
import path from "node:path";
import {spawn, spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const projectName = args[0];
if(projectName === "app"){
    fs.rmSync("dist", { recursive: true, force: true });
    const webPath = path.resolve("src","apps","web");
    const appPath = path.resolve("src","apps","app");
    spawnSync("npm run", ["--prefix", webPath, "build"], { stdio: "inherit", shell: true });
    spawn("npm run", ["--prefix", appPath, "build"], { stdio: "inherit", shell: true });
}else if (projectName === "website") {
    const projectPath = path.resolve("src", "apps", projectName);
    spawn("npm run", ["--prefix", projectPath, "build"], {
      stdio: "inherit",
      shell: true,
    });
  } else {
    console.log("Invalid project name");
  }
