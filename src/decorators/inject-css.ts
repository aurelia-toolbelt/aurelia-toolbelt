import { metadata, Origin } from 'aurelia-metadata';
import { Loader } from 'aurelia-loader';
import { Container, inject } from 'aurelia-dependency-injection';
import { DOM, PLATFORM } from 'aurelia-pal';
import { relativeToFile } from 'aurelia-path';


export function injectCss(address: string): any {
  return function (target: Function) {

    let container = Container.instance;

    let loader: Loader = <Loader>container.get(Loader);

    let css_id = 'inject_css_' + target.name.toLowerCase();

    loader.loadText(address).then(css => {
      DOM.injectStyles(css, null, null, css_id);
    });

    target.prototype.injectedCssId = css_id;

    return target;

  };
}

// #region commented out codes :

    // let ctor = target.constructor;

    // setTimeout(() => {
    //   const moduleId = Origin.get(target).moduleId;
    //   console.log('moduleId: ' + moduleId); // only work after delay
    // });

    // const myModuleId = Origin.get(ctor).moduleId;
    // const absolutePath = relativeToFile(address, myModuleId);



// export function injectCss2<T extends { new(...args: any[]): {} }>(constructor: T) {
//   console.log(constructor);
//   const myModuleId = Origin.get(constructor).moduleId;
//   return class extends constructor {

//   };

// }

 //#endregion
