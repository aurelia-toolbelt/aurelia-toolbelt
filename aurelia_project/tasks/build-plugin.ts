import * as gulp from "gulp";
// @ts-ignore
import * as project from "../aurelia.json";

import {
  pluginMarkup,
} from "./process-markup";
import {
  pluginCSS,
  pluginScss,
} from "./process-css";
import {
  transpilePlugin
} from "./transpile";
import * as del from "del";
// @ts-ignore
import * as project from "../aurelia.json";

function clean() {
  return del(project.plugin.output);
}

export default gulp.series(
  clean,
  gulp.parallel(
    pluginMarkup,
    transpilePlugin,
    pluginCSS,
    pluginScss
  )
)
