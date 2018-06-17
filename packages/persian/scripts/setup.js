// @ts-check
/**
 * Helper to setup the plugin for new users
 *
 */
// @ts-ignore
const OLD_FOLDER_NAME = require('../package.json').folder_name;
// @ts-ignore
const OLD_PLUGIN_VERSION = require('../package.json').version;
// @ts-ignore
const OLD_PLUGIN_NAME = require('../package.json').name;
const PLUGIN_PACKAGE_PATH = './package.json';
const PLUGIN_PACKAGELOCK_PATH = './package-lock.json';
// Defaults
const NEW_PLUGIN_DEFAULT_NAME = 'aurelia-plugin';
const NEW_PLUGIN_DEFAULT_VERSION = '1.0.0-beta.1';
// Console params
var NEW_PLUGIN_NAME = process.argv[2];
var NEW_PLUGIN_VERSION = process.argv[3] || OLD_PLUGIN_VERSION || NEW_PLUGIN_DEFAULT_VERSION;
// Interactive console
const readlineSync = require('readline-sync');

const {
  consoleLog,
  consoleError,
  readFile,
  writeFile,
  renameFolder
} = require('./common');


const setup = async function () {
  try {
    /**
     * Inform user we are staring
     *
     */
    consoleLog('white', '*****************************************************************\n');
    consoleLog('blue', 'Start scaffolding package...');





    /**
     * Check if user have supplied minimum data (new name)
     * Then show them new name/version
     *
     */
    if (!NEW_PLUGIN_NAME) {
      var packageName = readlineSync.question(' What is your package name? [' + NEW_PLUGIN_DEFAULT_NAME + '] ');
      NEW_PLUGIN_NAME = packageName || NEW_PLUGIN_DEFAULT_NAME;
      var pluginVersion = readlineSync.question(' What is your package version? [' + NEW_PLUGIN_DEFAULT_VERSION + '] ');
      NEW_PLUGIN_VERSION = pluginVersion || NEW_PLUGIN_DEFAULT_VERSION;
    }

    consoleLog('green', `Plugin name is: ${NEW_PLUGIN_NAME}`);
    consoleLog('green', `Plugin version is: ${NEW_PLUGIN_VERSION}`);

    let NEW_FOLDER_NAME = NEW_PLUGIN_NAME;

    if (NEW_PLUGIN_NAME.indexOf('/')) {
      consoleLog('red', `Plugin name, "${NEW_PLUGIN_NAME}", contains invalid character "/" the part after that will be used for folder name `);
      NEW_FOLDER_NAME = NEW_PLUGIN_NAME.substr(NEW_PLUGIN_NAME.indexOf('/') + 1);
    }
    consoleLog('green', `Folder name will be: ${NEW_FOLDER_NAME}`);


    /**
     * Parse package.json and update name, version and aurelia resources section with new name
     * when we are done we update the file (save data)
     *
     */
    consoleLog('white', 'Reading the package.json file, please wait...');
    let packageJsonRaw = await readFile(PLUGIN_PACKAGE_PATH);
    consoleLog('white', 'The package.json file is read, applying necessary changes...');

    let packageJsonObj = JSON.parse(packageJsonRaw);
    packageJsonObj.name = NEW_PLUGIN_NAME;
    packageJsonObj.folder_name = NEW_FOLDER_NAME;
    packageJsonObj.version = NEW_PLUGIN_VERSION;


    let resources = packageJsonObj.aurelia.build.resources;
    for (let index = 0; index < resources.length; index++) {
      resources[index] = resources[index].replace(OLD_FOLDER_NAME, NEW_PLUGIN_NAME);
    }
    packageJsonObj.aurelia.build.resources = resources;
    packageJsonObj = JSON.stringify(packageJsonObj, null, 4);

    consoleLog('white', 'Updating package.json file ...');
    await writeFile(PLUGIN_PACKAGE_PATH, packageJsonObj);
    consoleLog('white', 'The package.json file updated');





    /**
     * Parse package-lock.json and update name, version
     * when we are done we update the file (save data)
     *
     */
    consoleLog('white', 'Reading the package.lock.json file, please wait...');
    let packageLockJsonRaw = await readFile(PLUGIN_PACKAGELOCK_PATH);
    consoleLog('white', 'The package-lock.json file is read, applying necessary changes...');

    let packageLockJsonObj = JSON.parse(packageLockJsonRaw);
    packageLockJsonObj.name = NEW_PLUGIN_NAME;
    packageJsonObj.folder_name = NEW_FOLDER_NAME;
    packageLockJsonObj.version = NEW_PLUGIN_VERSION;
    packageLockJsonObj = JSON.stringify(packageLockJsonObj, null, 4);

    consoleLog('white', 'Updating package.json file ...');
    await writeFile(PLUGIN_PACKAGELOCK_PATH, packageLockJsonObj);
    consoleLog('white', 'The package-lock.json file updated');





    /**
     * Read main.ts file under sample folder and update plugin name
     * when we are done we update the file (save data)
     *
     */
    consoleLog('white', 'Updating main.ts file ...');
    let aurelia_main = await readFile('./src/sample/main.ts');
    aurelia_main = aurelia_main.replace(`.plugin('${OLD_PLUGIN_NAME}')`, `.plugin('${NEW_PLUGIN_NAME}')`);
    await writeFile('./src/sample/main.ts', aurelia_main);
    consoleLog('green' , aurelia_main);
    consoleLog('white', 'The main.ts file updated.');




    /**
     * Rename folder under src
     * when we are done, we tell user everything is ready
     *
     */


    consoleLog('blue', 'Renaming the folders...');
    await renameFolder(`./src/${OLD_FOLDER_NAME}`, `./src/${NEW_FOLDER_NAME}`);
    consoleLog('blue', 'Rename completed');

    consoleLog('blue', 'Scaffold completed');
    consoleLog('purple', 'Ready to go, run build or watch scripts ');
    consoleLog('white', '\n*****************************************************************\n');

  } catch (err) {

    consoleError(err);

  }


};

setup();