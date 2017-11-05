import { FrameworkConfiguration } from "aurelia-framework";

export * from "./hello-world"

export function configure(config: FrameworkConfiguration) {
  config.globalResources("./hello-world");
}
