import { inject, customElement, bindable, bindingMode, containerless, PLATFORM, noView, DOM, useShadowDOM, customAttribute } from 'aurelia-framework';

export type FloatInputDirection = 'rtl' | 'ltr';
export type FloatInputSize = 'sm' | 'md' | 'lg';

const fl = require('aureliatoolbelt-thirdparty/jquery.float-label/jquery.float-label.js');
import 'aureliatoolbelt-thirdparty/jquery.float-label/jquery.float-label.css';

@containerless()
@customAttribute('at-float-label')
@inject(Element)
export class FloatLabelCustomAttribute {
  constructor(private element: Element) {
    //   DOM.injectStyles(`.at-float-label {
    //     position: relative;
    //     padding-top: 18px;
    // }
    // .at-float-label-rtl {
    //     right: 0;
    // }
    // .at-float-label-ltr {
    //     left: 0;
    // }
    // .at-float-label>.float-input {}
    // .at-float-label>.float-input:focus {}
    // .at-float-label>.float-label {
    //     position: absolute;
    //     top: 3px;
    //     -webkit-transition: top .3s ease-in-out, opacity .3s ease-in-out;
    //     transition: top .3s ease-in-out, opacity .3s ease-in-out;
    //     opacity: 0;
    //     font-size: 13px;
    // }
    // .at-float-label>.float-label.show {
    //     /* color: black;*/
    //     top: -3px;
    //     opacity: 1;
    // }
    // .at-float-label>.float-label.on {}
    // `, null, null, 'at-float-label-style');
  }

  private isTextBox(element: Element) {
    let tagName = element.tagName.toLowerCase();
    if (tagName === 'textarea') { return true; }
    if (tagName !== 'input') { return false; }
    let type = element.getAttribute('type').toLowerCase(),
      // if any of these input types is not supported by a browser, it will behave as input type text.
      inputTypes = ['text', 'password', 'number', 'email', 'tel', 'url', 'search', 'date', 'datetime', 'datetime-local', 'time', 'month', 'week'];
    return inputTypes.indexOf(type) >= 0;
  }

  private insertAfter(newChild: Node, refChild: Node) {
    refChild.parentNode.insertBefore(newChild, refChild.nextSibling);
  }

  private injectJavascriptText(text: string, id?: string) {
    if (id) {
      if (document.getElementById(id)) {
        return;
      }
    }
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = text;
    if (id) {
      script.id = id;
    }
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  private injectJavascriptUrl(url: string, id?: string) {
    if (id) {
      if (document.getElementById(id)) {
        return;
      }
    }
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    if (id) {
      script.id = id;
    }
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  private attached() {

    if (!this.isTextBox(this.element)) {
      Error('at-float-label works on `input` elements.');
    }

    this.element.classList.add('float-input');

    let label = <HTMLLabelElement>document.createElement('LABEL');
    label.textContent = 'Hamed Khan';
    label.htmlFor = this.element.id;
    label.classList.add('float-label');

    let parent = this.element.parentElement;
    if (parent instanceof HTMLDivElement) {
      parent.classList.add('at-float-label');
      this.insertAfter(label, this.element);
    } else {
      let div = <HTMLDivElement>document.createElement('DIV');
      div.setAttribute('class', 'at-float-label');
      div.appendChild(label);
      this.insertAfter(div, this.element);
      div.appendChild(this.element);
    }
  }

}

