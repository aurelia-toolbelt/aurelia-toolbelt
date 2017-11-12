"use strict"

const fs = require("fs");
const exec = require("child_process").exec;
const spawn = require("child_process").spawn;

const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const mode = "inherit";

let PLUGIN_NAME = "aurelia-toolbelt";
let PLUGIN_VERSION = "0.0.1";


function spawner(cmd, args, dirname) {
  return new Promise((resolve, reject) => {
    var childSpawn = spawn(cmd, args, {
      stdio: mode,
      cwd: dirname
    });
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

function safeIncreaseVersion(version) {

  let theVersion = parseInt(version);

  if (theVersion >= Number.MAX_SAFE_INTEGER - 1) {
    console.warn('First delete existing yarn,npm,node,fuse-box,webpack');
    return 0;
  } else {
    return theVersion + 1;
  }
}

function updatePluginPackage() {
  console.info('Updating plugin package.json...');
  let pluginPackageFile = './package.json';
  fs.readFile(pluginPackageFile, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    let obj = JSON.parse(data);

    let versions = new Array();

    versions = obj.version.split('.');

    PLUGIN_NAME = obj.name || PLUGIN_NAME;
    PLUGIN_VERSION = obj.version || PLUGIN_VERSION;

    var fileName = PLUGIN_NAME + '-' + PLUGIN_VERSION + '.tgz'; // like aurelia-toolbelt-0.5.6.tgz

    if (versions && (versions.length > 0)) {
      versions[versions.length - 1] = safeIncreaseVersion(versions[versions.length - 1]);
      console.info(`Version changing ${obj.version} => ${versions.join('.')}`);
      obj.version = versions.join('.');
      PLUGIN_VERSION = versions.join('.');
    }

    obj = JSON.stringify(obj, null, 4);

    fs.writeFile(pluginPackageFile, obj);

    fs.unlink(fileName, function (error) {});

    console.log('Plugin package.json updated.');

  });

}

function updateSamplePackage() {
  console.info('Updating sample package.json...');
  let samplePackageFile = './sample/package.json';
  fs.readFile(samplePackageFile, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    let obj = JSON.parse(data);
    obj.dependencies[PLUGIN_NAME] = "../" + PLUGIN_NAME + '-' + PLUGIN_VERSION + '.tgz'; // like ../aurelia-toolbelt-0.5.6.tgz

    obj = JSON.stringify(obj, null, 4);

    fs.writeFile(samplePackageFile, obj);
    console.log('Sample package.json updated.');

  });
}

let NpmInstallRoot = spawner(npm, ["install"], this.mainPath).then(() => {

  updatePluginPackage();

  let NpmPackRoot = spawner(npm, ["pack"], this.mainPath).then(() => {

    updateSamplePackage();

    let NpmInstallSample = spawner(npm, ["install"], this.samplePath);
  });

});
