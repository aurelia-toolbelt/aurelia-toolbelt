"use strict"

const fs = require("fs");
const exec = require("child_process").exec;
const spawn = require("child_process").spawn;

const npm = process.platform === "win32" ? "npm.cmd":"npm";
const mode = "inherit";

function spawner(cmd, args, dirname) {
        return new Promise((resolve, reject) => {
            var childSpawn = spawn(cmd, args, {stdio: mode, cwd: dirname});
            childSpawn.on("exit", function (code) {
                if (code != 0) {
                    console.log("Failed: " + code);
                    reject();
                } else {
                    resolve()
                }
            });
        });
    }

this.mainPath = `${__dirname}${process.platform === "win32" ? "\\":"//"}`
this.samplePath = `${__dirname}${process.platform === "win32" ? "\\sample":"//sample"}`

let NpmInstallRoot = spawner(npm, ["install"], this.mainPath).then(()=>{
    let NpmInstallSample = spawner(npm, ["install"], this.samplePath);
});
