import { CssMinifier } from './../../../utilities/purejs/cssMinifier';
import { transient, customElement, inject, containerless, bindable, bindingMode, observable, DOM } from 'aurelia-framework';


import * as $ from 'jquery';
import 'aureliatoolbelt-thirdparty/jquery.blockUI/jquery.blockUI.js';
import { IAutBlockUIOptions } from './aut-block-ui-options';

@transient()
@customElement('aut-block-ui')
@inject(Element, 'aut-block-ui-option', CssMinifier)
export class JQueryBlockUI {

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public block: string | boolean = false;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public blockPage: string | boolean = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public title: string = null;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public message: string = null;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public spinnerColor: string = null;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public spinnerSize: string = '12px';

  private content: HTMLDivElement;
  private spinnerMessage: string = null;
  private elementId: string;
  constructor(private element: Element, private option: IAutBlockUIOptions, private cssMinifier: CssMinifier) {

  }

  private hasContent() {
    let slot = this.content.innerHTML.replace('<!--slot-->', '').trim();
    if (slot.length > 0) {
      return true;
    }
    return false;
  }

  private afterAttached() {
    let id = this.content.id;
    this.elementId = '#' + id;

    let unit: string = this.getSizeUnit(this.spinnerSize);
    let size: number = this.getSize(this.spinnerSize);

    $.blockUI.defaults.allowBodyStretch = this.option.allowBodyStretch || true;
    $.blockUI.defaults.draggable = this.option.draggable || true;
    $.blockUI.defaults.css = this.option.css || {
      padding: 0,
      margin: 0,
      textAlign: 'center',
      color: '#000',
      border: '3px solid #aaa',
      backgroundColor: '#fff',
      cursor: 'wait'
    };
    $.blockUI.defaults.overlayCSS = this.option.overlayCSS || {
      backgroundColor: '#000',
      opacity: 0.6,
      cursor: 'wait'
    };
    $.blockUI.defaults.cursorReset = this.option.cursorReset || 'default';
    $.blockUI.defaults.iframeSrc = this.option.iframeSrc || (/^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank');
    $.blockUI.defaults.forceIframe = this.option.forceIframe || false;
    $.blockUI.defaults.baseZ = this.option.baseZ || 1020;
    $.blockUI.defaults.centerX = this.option.centerX || true;
    $.blockUI.defaults.centerY = this.option.centerY || true;
    $.blockUI.defaults.bindEvents = this.option.bindEvents || true;
    $.blockUI.defaults.constrainTabKey = this.option.constrainTabKey || true;
    $.blockUI.defaults.fadeIn = this.option.fadeIn || 200;
    $.blockUI.defaults.fadeOut = this.option.fadeOut || 400;
    $.blockUI.defaults.timeout = this.option.timeout || 0;
    $.blockUI.defaults.showOverlay = this.option.showOverlay || true;
    $.blockUI.defaults.focusInput = this.option.focusInput || true;
    $.blockUI.defaults.onBlock = this.option.onBlock || null;
    $.blockUI.defaults.onUnblock = this.option.onUnblock || null;
    $.blockUI.defaults.quirksmodeOffsetHack = this.option.quirksmodeOffsetHack || 4;
    $.blockUI.defaults.blockMsgClass = this.option.blockMsgClass || 'blockMsg';
    $.blockUI.defaults.ignoreIfBlocked = this.option.ignoreIfBlocked || false;

    if (this.blockPage && this.hasContent()) {
      throw Error('You can not use the [aut-block-ui] with [block-page] property, while you have defined a content inside it.');
    }
    let minify = `
            .${'b' + id} {
              width: ${size}${unit} !important;
              height: ${size}${unit} !important;
              background-color: ${this.spinnerColor || '#92459B'} !important;
            }`;
    DOM.injectStyles(this.cssMinifier.minify(minify), null, null, 's' + id);
    // tslint:disable-next-line:max-line-length
    this.spinnerMessage = `<div class="bounce"><div class="bounce1 ${'b' + id}"></div><div class="bounce2 ${'b' + id}"></div><div class="bounce3 ${'b' + id}"></div></div>`;



    let contents = this.content.children;
    let blockElement = null;
    for (let index = 0; index < contents.length; index++) {
      if (contents[index].classList.contains('blockElement')) {
        blockElement = contents[index];
      }
    }

    this.blockChanged(this.block);
    this.blockPageChanged(this.blockPage);

  }

  private blockChanged(isBlocked: boolean | string) {
    let option: any = {};
    if (this.message == null || this.message.length < 0) {
      option = {
        css: {
          border: 'none',
          backgroundColor: 'transparent'
        },
        message: this.spinnerMessage,
        overlayCSS: {
          backgroundColor: '#F7F7F7'
        }
      };
    } else {
      option = {
        message: this.message
      };
    }
    if (isBlocked) {
      $(this.elementId).block(option);
      this.element.classList.add('block-ui-content');
      $(window).resize(() => {
        if (this.element.classList.contains('block-ui-content')) {
          $(this.elementId).block(option);
        }
      });
    } else {
      $(this.elementId).unblock();
      this.element.classList.remove('block-ui-content');
    }
  }

  private blockPageChanged(isBlocked: boolean | string) {
    if (this.blockPage && this.hasContent()) {
      throw Error('You can not use the [aut-block-ui] with [block-page] property, while you have defined a content inside it.');
    }
    let option: any = {};
    if (this.message == null || this.message.length < 0) {
      option = {
        css: {
          border: 'none',
          backgroundColor: 'transparent'
        },
        message: this.spinnerMessage,
        overlayCSS: {
          backgroundColor: '#F7F7F7'
        }
      };
    } else {
      option = {
        message: this.message
      };
    }
    if (isBlocked) {
      $.blockUI(option);
      // this.element.classList.add('block-ui-content');
      // $(window).resize(() => {
      //   if (this.element.classList.contains('block-ui-content')) {
      //     $(this.content).block(option);
      //   }
      // });
    } else {
      $.unblockUI();
      // this.element.classList.remove('block-ui-content');
    }
  }

  private getSizeUnit(text: string): string {
    let unit = text.replace(/[0-9]/g, '').replace('.', '');
    if (unit === '') {
      unit = 'px';
    }
    return unit;
  }

  private getSize(text: string) {
    let unit = this.getSizeUnit(text);
    let size = Number(text.replace(unit, '').trim());
    return size;
  }

  private detached() {
    $.unblockUI();
    $(this.content).unblock();
  }
}
