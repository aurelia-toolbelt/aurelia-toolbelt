import { transient, customElement, inject, containerless, bindable, bindingMode, observable, DOM } from 'aurelia-framework';


import * as $ from 'jquery';
import 'aureliatoolbelt-thirdparty/jquery.blockUI/jquery.blockUI.js';
import { IAutBlockUIOptions, SpinnerType } from './aut-block-ui-options';

@transient()
@customElement('aut-block-ui')
@inject(Element, 'aut-block-ui-option')
export class JQueryBlockUI {

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public block: string | boolean = false;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public blockPage: string | boolean = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public title: string = null;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public message: string = null;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public spinnerType: SpinnerType = 'bounce';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public spinnerColor: string = null;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public spinnerSize: number = null;

  private content: HTMLDivElement;
  private spinnerMessage: string = null;
  private elementId: string;
  constructor(private element: Element, private option: IAutBlockUIOptions) {

  }

  private hasContent() {
    let slot = this.content.innerHTML.replace('<!--slot-->', '').trim();
    if (slot.length > 0) {
      return true;
    }
    return false;
  }

  private afterAttached() {
    this.elementId = '#' + this.content.id;
    $.blockUI.defaults.allowBodyStretch = this.option.allowBodyStretch || true;
    $.blockUI.defaults.draggable = this.option.draggable || true;
    $.blockUI.defaults.css = this.option.css || {
      padding: 0,
      margin: 0,
      width: '30%',
      top: '40%',
      left: '35%',
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
    $.blockUI.defaults.baseZ = this.option.baseZ || 999999999;
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

    this.blockChanged(this.block);
    this.blockPageChanged(this.blockPage);

  }

  private bind() {
    if (this.spinnerType === 'bounce') {
      DOM.injectStyles(` .blockElement
            {
              width: ${this.spinnerSize * 3 || 36}px !important;
            }
            .bounce > div {
              width: ${this.spinnerSize || 12}px;
              height: ${this.spinnerSize || 12}px;
              background-color: ${this.spinnerColor || '#92459B'};
            }`);
      this.spinnerMessage = '<div class="bounce"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';
    }
    if (this.spinnerType === 'doubleBounce') {
      DOM.injectStyles(`.double-bounce {
      width: ${this.spinnerSize || 15}px !important;
      height: ${this.spinnerSize || 15}px !important;
      text-align: center;
      position: relative;
    }
    .blockElement
    {
      width: ${this.spinnerSize || 15}px !important;
      height: ${this.spinnerSize || 15}px !important;
    }
    .double-bounce1, .double-bounce2 {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color:  ${this.spinnerColor || '#92459B'};
      opacity: 0.6;
      position: absolute;
      top: 0;
      left: 0;
      -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
      animation: sk-bounce 2.0s infinite ease-in-out;
    }

    .double-bounce2 {
      -webkit-animation-delay: -1.0s;
      animation-delay: -1.0s;
    }

    @-webkit-keyframes sk-bounce {
      0%, 100% { -webkit-transform: scale(0.0) }
      50% { -webkit-transform: scale(1.0) }
    }

    @keyframes sk-bounce {
      0%, 100% {
        transform: scale(0.0);
        -webkit-transform: scale(0.0);
      } 50% {
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
      }
    }`);
      this.spinnerMessage = '<div class="double-bounce"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>';
    }
    if (this.spinnerType === 'rectangle') {
      DOM.injectStyles(`.rectangle {
      width: ${this.spinnerSize != null ? (this.spinnerSize + 10) : 40}px;
      height: ${this.spinnerSize || 30}px;
      text-align: center;
      font-size: 10px;
    }
    .blockElement
    {
      width: ${this.spinnerSize != null ? (this.spinnerSize + 10) : 40}px !important;
      height: ${this.spinnerSize || 30}px !important;
    }
    .rectangle > div {
      background-color: ${this.spinnerColor || '#92459B'};
      height: 100%;
      width: 6px;
      display: inline-block;
      -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
      animation: sk-stretchdelay 1.2s infinite ease-in-out;
    }

    .rectangle .rect2 {
      -webkit-animation-delay: -1.1s;
      animation-delay: -1.1s;
    }

    .rectangle .rect3 {
      -webkit-animation-delay: -1.0s;
      animation-delay: -1.0s;
    }

    .rectangle .rect4 {
      -webkit-animation-delay: -0.9s;
      animation-delay: -0.9s;
    }

    .rectangle .rect5 {
      -webkit-animation-delay: -0.8s;
      animation-delay: -0.8s;
    }

    @-webkit-keyframes sk-stretchdelay {
      0%, 40%, 100% { -webkit-transform: scaleY(0.4) }
      20% { -webkit-transform: scaleY(1.0) }
    }

    @keyframes sk-stretchdelay {
      0%, 40%, 100% {
        transform: scaleY(0.4);
        -webkit-transform: scaleY(0.4);
      }  20% {
        transform: scaleY(1.0);
        -webkit-transform: scaleY(1.0);
      }
    }`);
      this.spinnerMessage = `<div class="rectangle"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4">
          </div><div class="rect5"></div></div>`;
    }
    if (this.spinnerType === 'cubeGrid') {
      DOM.injectStyles(`.sk-cube-grid {
              width: ${this.spinnerSize || 20}px;
              height: ${this.spinnerSize || 20}px;
            }
            .blockElement
            {
              width: ${this.spinnerSize || 20}px !important;
              height: ${this.spinnerSize || 20}px !important;
            }
            .sk-cube-grid .sk-cube {
              width: 33%;
              height: 33%;
              background-color: ${this.spinnerColor || '#92459B'};
              float: left;
              -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
                      animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
            }
            .sk-cube-grid .sk-cube1 {
              -webkit-animation-delay: 0.2s;
                      animation-delay: 0.2s; }
            .sk-cube-grid .sk-cube2 {
              -webkit-animation-delay: 0.3s;
                      animation-delay: 0.3s; }
            .sk-cube-grid .sk-cube3 {
              -webkit-animation-delay: 0.4s;
                      animation-delay: 0.4s; }
            .sk-cube-grid .sk-cube4 {
              -webkit-animation-delay: 0.1s;
                      animation-delay: 0.1s; }
            .sk-cube-grid .sk-cube5 {
              -webkit-animation-delay: 0.2s;
                      animation-delay: 0.2s; }
            .sk-cube-grid .sk-cube6 {
              -webkit-animation-delay: 0.3s;
                      animation-delay: 0.3s; }
            .sk-cube-grid .sk-cube7 {
              -webkit-animation-delay: 0s;
                      animation-delay: 0s; }
            .sk-cube-grid .sk-cube8 {
              -webkit-animation-delay: 0.1s;
                      animation-delay: 0.1s; }
            .sk-cube-grid .sk-cube9 {
              -webkit-animation-delay: 0.2s;
                      animation-delay: 0.2s; }
            @-webkit-keyframes sk-cubeGridScaleDelay {
              0%, 70%, 100% {
                -webkit-transform: scale3D(1, 1, 1);
                        transform: scale3D(1, 1, 1);
              } 35% {
                -webkit-transform: scale3D(0, 0, 1);
                        transform: scale3D(0, 0, 1);
              }
            }
            @keyframes sk-cubeGridScaleDelay {
              0%, 70%, 100% {
                -webkit-transform: scale3D(1, 1, 1);
                        transform: scale3D(1, 1, 1);
              } 35% {
                -webkit-transform: scale3D(0, 0, 1);
                        transform: scale3D(0, 0, 1);
              }
            }`);
      this.spinnerMessage = `<div class="sk-cube-grid"><div class="sk-cube sk-cube1">
          </div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div>
          <div class="sk-cube sk-cube5"></div><div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8">
          </div><div class="sk-cube sk-cube9"></div></div>`;
    }
    if (this.spinnerType === 'fadingCircle') {
      DOM.injectStyles(`.sk-fading-circle {
              width: ${this.spinnerSize || 20}px;
              height: ${this.spinnerSize || 20}px;
              position: relative;
            }
            .blockElement
            {
              width: ${this.spinnerSize || 20}px !important;
              height: ${this.spinnerSize || 20}px !important;
            }
            .sk-fading-circle .sk-circle {
              width: 100%;
              height: 100%;
              position: absolute;
              left: 0;
              top: 0;
            }
            .sk-fading-circle .sk-circle:before {
              content: '';
              display: block;
              margin: 0 auto;
              width: 15%;
              height: 15%;
              background-color: ${this.spinnerColor || '#92459B'};
              border-radius: 100%;
              -webkit-animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;
                      animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;
            }
            .sk-fading-circle .sk-circle2 {
              -webkit-transform: rotate(30deg);
                  -ms-transform: rotate(30deg);
                      transform: rotate(30deg);
            }
            .sk-fading-circle .sk-circle3 {
              -webkit-transform: rotate(60deg);
                  -ms-transform: rotate(60deg);
                      transform: rotate(60deg);
            }
            .sk-fading-circle .sk-circle4 {
              -webkit-transform: rotate(90deg);
                  -ms-transform: rotate(90deg);
                      transform: rotate(90deg);
            }
            .sk-fading-circle .sk-circle5 {
              -webkit-transform: rotate(120deg);
                  -ms-transform: rotate(120deg);
                      transform: rotate(120deg);
            }
            .sk-fading-circle .sk-circle6 {
              -webkit-transform: rotate(150deg);
                  -ms-transform: rotate(150deg);
                      transform: rotate(150deg);
            }
            .sk-fading-circle .sk-circle7 {
              -webkit-transform: rotate(180deg);
                  -ms-transform: rotate(180deg);
                      transform: rotate(180deg);
            }
            .sk-fading-circle .sk-circle8 {
              -webkit-transform: rotate(210deg);
                  -ms-transform: rotate(210deg);
                      transform: rotate(210deg);
            }
            .sk-fading-circle .sk-circle9 {
              -webkit-transform: rotate(240deg);
                  -ms-transform: rotate(240deg);
                      transform: rotate(240deg);
            }
            .sk-fading-circle .sk-circle10 {
              -webkit-transform: rotate(270deg);
                  -ms-transform: rotate(270deg);
                      transform: rotate(270deg);
            }
            .sk-fading-circle .sk-circle11 {
              -webkit-transform: rotate(300deg);
                  -ms-transform: rotate(300deg);
                      transform: rotate(300deg);
            }
            .sk-fading-circle .sk-circle12 {
              -webkit-transform: rotate(330deg);
                  -ms-transform: rotate(330deg);
                      transform: rotate(330deg);
            }
            .sk-fading-circle .sk-circle2:before {
              -webkit-animation-delay: -1.1s;
                      animation-delay: -1.1s;
            }
            .sk-fading-circle .sk-circle3:before {
              -webkit-animation-delay: -1s;
                      animation-delay: -1s;
            }
            .sk-fading-circle .sk-circle4:before {
              -webkit-animation-delay: -0.9s;
                      animation-delay: -0.9s;
            }
            .sk-fading-circle .sk-circle5:before {
              -webkit-animation-delay: -0.8s;
                      animation-delay: -0.8s;
            }
            .sk-fading-circle .sk-circle6:before {
              -webkit-animation-delay: -0.7s;
                      animation-delay: -0.7s;
            }
            .sk-fading-circle .sk-circle7:before {
              -webkit-animation-delay: -0.6s;
                      animation-delay: -0.6s;
            }
            .sk-fading-circle .sk-circle8:before {
              -webkit-animation-delay: -0.5s;
                      animation-delay: -0.5s;
            }
            .sk-fading-circle .sk-circle9:before {
              -webkit-animation-delay: -0.4s;
                      animation-delay: -0.4s;
            }
            .sk-fading-circle .sk-circle10:before {
              -webkit-animation-delay: -0.3s;
                      animation-delay: -0.3s;
            }
            .sk-fading-circle .sk-circle11:before {
              -webkit-animation-delay: -0.2s;
                      animation-delay: -0.2s;
            }
            .sk-fading-circle .sk-circle12:before {
              -webkit-animation-delay: -0.1s;
                      animation-delay: -0.1s;
            }
            @-webkit-keyframes sk-circleFadeDelay {
              0%, 39%, 100% { opacity: 0; }
              40% { opacity: 1; }
            }
            @keyframes sk-circleFadeDelay {
              0%, 39%, 100% { opacity: 0; }
              40% { opacity: 1; }
            }`);
      this.spinnerMessage = `<div class="sk-fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div>
          <div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div>
          <div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div>
          <div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle">
          </div><div class="sk-circle12 sk-circle"></div></div>`;
    }
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

  private detached() {
    $.unblockUI();
    $(this.content).unblock();
  }
}
