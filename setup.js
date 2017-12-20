"use strict"

const fs = require("fs");
const exec = require("child_process").exec;
const spawn = require("child_process").spawn;

const yarn = process.platform === "win32" ? "yarn.cmd" : "yarn";
const mode = "inherit";

let PLUGIN_NAME = "aurelia-toolbelt";
let PLUGIN_SAMPLE_NAME = "aurelia-toolbelt-fusebox";
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

this.mainPath = `${__dirname}${process.platform === "win32" ? "\\" : "//"}`
this.samplePath = `${__dirname}${process.platform === "win32" ? "\\sample" : "//sample"}`

function safeIncreaseVersion(version) {

  let theVersion = parseInt(version);

  if (theVersion >= Number.MAX_SAFE_INTEGER - 1) {
    console.warn('First delete existing yarn,npm,node,fuse-box,webpack');
    return 0;
  } else {
    return theVersion + 1;
  }
}

//--------------------------------------------------------------------------------------------
function updateSampleConfig() {
  console.info('Updating plugin package.json...');

  const argVersion = process.argv[2]; // -v
  const argVersionNumber = process.argv[3]; // eg 1.5.6

  let pluginPackageFile = './package.json';
  let samplePackageFile = './sample/package.json';
  fs.readFile(pluginPackageFile, 'utf8', (err, data) => {
    let obj = JSON.parse(data);

    let versions = new Array();

    versions = obj.version.split('.');

    PLUGIN_NAME = obj.name || PLUGIN_NAME;
    PLUGIN_VERSION = obj.version || PLUGIN_VERSION;

    if (versions && (versions.length > 0)) {
      if (argVersion != undefined && argVersionNumber == undefined) {
        versions[versions.length - 1] = safeIncreaseVersion(versions[versions.length - 1]);
      }
      if (argVersionNumber != undefined) {
        versions = argVersionNumber.split('.');
      }
      console.info(`Version changing ${obj.version} => ${versions.join('.')}`);
      obj.version = versions.join('.');
      PLUGIN_VERSION = versions.join('.');
    }

    const dev = obj.dependencies;
    let sampleDep = {};
    let sample = {};

    fs.readFile(samplePackageFile, 'utf8', (err, res) => {

      sample = JSON.parse(res);
      sampleDep = sample.dependencies;

      sample.dependencies = dev;
      sample.version = PLUGIN_VERSION;
      sample.name = PLUGIN_SAMPLE_NAME;

      obj = JSON.stringify(obj, null, 4);
      let smplObj = JSON.stringify(sample, null, 4);

      fs.writeFile(pluginPackageFile, obj, function (e) { });
      fs.writeFile(samplePackageFile, smplObj, function (e) { });

      console.log('Plugin package.json updated.');

    });


  });
}

let NpmInstallRoot = spawner(yarn, ["install"], this.mainPath).then(() => {

  updateSampleConfig();

  let NpmInstallSample = spawner(yarn, ["install"], this.samplePath);

});
