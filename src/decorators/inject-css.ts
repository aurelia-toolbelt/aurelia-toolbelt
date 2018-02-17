import { metadata } from 'aurelia-metadata';
import { Loader } from 'aurelia-loader';
import { Container, DOM, inject } from 'aurelia-framework';

export function injectCss(value: string): any {
  return function (target: Function) {

    let container = Container.instance;

    let loader: Loader = <Loader>container.get(Loader);

    let css_id = 'inject_css_' + target.name;

    loader.loadText(value).then(css => {
      DOM.injectStyles(css, null, null, css_id);
    });

    target.prototype.injectedCssId = css_id;

    return target;

  };
}
