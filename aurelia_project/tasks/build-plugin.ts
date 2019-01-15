import * as gulp from "gulp";
import {
  pluginMarkupAMD,
  pluginMarkupCommon,
  pluginMarkupES2015,
  pluginMarkupSystem
} from "./process-markup";
import {
  pluginCSSAMD,
  pluginCSSCommon,
  pluginCSSES2015,
  pluginCSSSystem,
  pluginScssAMD,
  pluginScssCommon,
  pluginScssES2015,
  pluginScssSystem
} from "./process-css";
import {
  transpilePluginCommon,
  transpilePluginAMD,
  transpilePluginSystem,
  transpilePluginES2015
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
    pluginMarkupAMD,
    pluginCSSAMD,
    transpilePluginAMD,
    pluginScssAMD,

    pluginMarkupCommon,
    transpilePluginCommon,
    pluginCSSCommon,
    pluginScssCommon,

    pluginMarkupES2015,
    transpilePluginES2015,
    pluginCSSES2015,
    pluginScssES2015,
    
    pluginCSSSystem,
    pluginMarkupSystem,
    transpilePluginSystem,
    pluginScssSystem
  )
);
