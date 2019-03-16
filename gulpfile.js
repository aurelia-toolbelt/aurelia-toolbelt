const gulp = require("gulp");
const path = require("path");
const fs = require("fs");
const glob = require("glob");
const tsdocparser = require("@microsoft/tsdoc");
const jsdocparser = require("jsdoc3-parser");
const htmlparser = require("htmlparser2");
const commentparser = require("comment-parser");
const doctrine = require("doctrine");
const jsdocapi = require("jsdoc-api");
const jsdocx = require("jsdoc-x");

const htmlTagRegex = /<((?=!\-\-)!\-\-[\s\S]*\-\-|((?=\?)\?[\s\S]*\?|((?=\/)\/[^.\-\d][^\/\]'"[!#$%&()*+,;<=>?@^`{|}~ ]*|[^.\-\d][^\/\]'"[!#$%&()*+,;<=>?@^`{|}~ ]*(?:\s[^.\-\d][^\/\]'"[!#$%&()*+,;<=>?@^`{|}~ ]*(?:=(?:"[^"]*"|'[^']*'|[^'"<\s]*))?)*)\s?\/?))>/;

function getDirectories(path) {
  var dirs = [];
  fs.readdirSync(path).forEach(file => {
    dirs.push(file);
  });
  return dirs;
}

gulp.task("default", async function() {
  // glob(path.join(__dirname,"**/index.ts"), {}, function(er, files) {
  //   console.log(files);

  // });
  let root = path.join(__dirname, "src", "projects", "bootstrap", "lib");
  let components = getDirectories(root);
  //console.log("-------------------------------");
  for (let index = 0; index < components.length; index++) {
    let element = path.join(root, components[index]);
    glob(path.join(element, "**/*.html"), {}, function(er, files) {
      for (let index = 0; index < files.length; index++) {
        fs.readFile(files[index], "utf-8", function(err, content) {
          let hasComment = false;
          var parser = new htmlparser.Parser(
            {
              oncomment: function(params) {
                //console.log(path.basename(files[index]));
                //console.log(params);
                //console.log(commentparser(params));
                var options = {
                  source: `
                /**
                 * Represents a book.
                 * @slot    
                 * @param {string} name - The title of the book.    
                 * @bindable {string} state - Represents the state of the component 
                 */
               function Book(title, author) {
               }`,
                  hierarchy: true
                };
                jsdocx.parse(options, function(err, docs) {
                  if (err) {
                    console.log(err.stack);
                    return;
                  }
                  console.log(docs);
                });

                var ast = doctrine.parse(params.trim(), {
                  unwrap: true,
                  sloppy: true,
                  lineNumbers: true
                });
                //let ast = jsdocapi.explainSync({ source: params.trim() });
                //console.log(htmlTagRegex.test(params.trim()));
                if (!htmlTagRegex.test(params.trim())) {
                  //console.log(ast);
                }
                hasComment = true;
              },
              onopentag: function(name, attribs) {
                if (hasComment) {
                  //console.log(name);
                  hasComment = false;
                  //console.log("-------------------------------");
                }
              },
              ontext: function(text) {
                //console.log("-->", text);
              },
              onclosetag: function(tagname) {
                if (tagname === "script") {
                  //console.log("That's it?!");
                }
              }
            },
            { decodeEntities: true }
          );
          parser.write(content);
          parser.end();
        });
      }
    });
  }

  /*
  let h = path.join(__dirname, "src", "resources", "elements", "test.html");
  let t = path.join(__dirname, "src", "resources", "elements", "test.ts");
  let j = path.join(__dirname, "src", "resources", "elements", "testjsdoc.js");

  fs.readFile(h, "utf-8", function(err, content) {
    var parser = new htmlparser.Parser(
      {
        oncomment: function name(params) {},
        onopentag: function(name, attribs) {
          if (name === "script" && attribs.type === "text/javascript") {
            console.log("JS! Hooray!");
          }
        },
        ontext: function(text) {
          console.log("-->", text);
        },
        onclosetag: function(tagname) {
          if (tagname === "script") {
            console.log("That's it?!");
          }
        }
      },
      { decodeEntities: true }
    );
    parser.write(content);
    parser.end();
  });

  fs.readFile(t, "utf-8", function(err, content) {
    let parseTS = new tsdocparser.TSDocParser().parseString(content);
    //console.log(parseTS);
  });

  fs.readFile(j, "utf-8", function(err, content) {
    jsdocparser(j, function(error, ast) {
      let parseJS = ast;
      // console.log(parseJS);
    });
  });*/
});
