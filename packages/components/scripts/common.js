// @ts-check
const fs = require('fs');
const path = require('path');
/**
 * Writes to file and returns promise
 *
 */
const renameFolder = (oldPath, newPath) => {
    return new Promise((resolve, reject) => {
        fs.rename(path.resolve(oldPath), path.resolve(newPath), function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const readFile = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(file), 'UTF8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

const writeFile = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path.resolve(file), data, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

// @ts-check
const print = (color, comment, error) => {
    switch (color) {
        case 'green':
            color = '\x1b[32m';
            break;
        case 'white':
            color = '\x1b[37m';
            break;
        case 'red':
            color = '\x1b[31m';
            break;
        case 'blue':
            color = '\x1b[36m';
            break;
        case 'purple':
            color = '\x1b[35m';
            break;
        default:
            color = '\x1b[37m';
    }

    if (error) {
        // Use red always
        console.error('\x1b[31m', comment);
    } else {
        console.log(color, comment);
    }
};

const consoleLog = function (color, comment) {
    print(color, comment, false);
};

const consoleError = function (comment) {
    print('red', comment, true);
};

module.exports = {
    renameFolder,
    readFile,
    writeFile,
    consoleLog,
    consoleError
}