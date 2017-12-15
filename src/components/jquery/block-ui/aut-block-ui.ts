import { transient, customElement, inject, containerless, bindable, bindingMode, observable } from 'aurelia-framework';
import './scripts/jquery.blockUI.js';

import * as $ from 'jquery';
import { IAutBlockUIOptions, SpinnerType } from './aut-block-ui-options';

@transient()
@customElement('aut-block-ui')
@inject(Element, 'aut-block-ui-option')
export class JQueryBlockUI {

    @bindable({ defaultBindingMode: bindingMode.oneWay }) private block: string | boolean = false;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) private title: string = null;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) private message: string = null;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) private spinnerType: SpinnerType = 'bounce';
    @bindable({ defaultBindingMode: bindingMode.oneWay }) private spinnerColor: string;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) private spinnerSize: string;

    private content: HTMLDivElement;

    constructor(private element: Element, private option: IAutBlockUIOptions) {

    }
    /*private bind() {
        $.blockUI.defaults.allowBodyStretch = this.option.allowBodyStretch;
        $.blockUI.defaults.draggable = this.option.draggable;
        $.blockUI.defaults.css = this.option.css;
        $.blockUI.defaults.overlayCSS = this.option.overlayCSS;
        $.blockUI.defaults.cursorReset = this.option.cursorReset;
        $.blockUI.defaults.iframeSrc = this.option.iframeSrc;
        $.blockUI.defaults.forceIframe = this.option.forceIframe;
        $.blockUI.defaults.baseZ = this.option.baseZ;
        $.blockUI.defaults.centerX = this.option.centerX;
        $.blockUI.defaults.bindEvents = this.option.bindEvents;
        $.blockUI.defaults.constrainTabKey = this.option.constrainTabKey;
        $.blockUI.defaults.fadeIn = this.option.fadeIn;
        $.blockUI.defaults.fadeOut = this.option.fadeOut;
        $.blockUI.defaults.timeout = this.option.timeout;
        $.blockUI.defaults.showOverlay = this.option.showOverlay;
        $.blockUI.defaults.focusInput = this.option.focusInput;
        $.blockUI.defaults.onBlock = this.option.onBlock;
        $.blockUI.defaults.onUnblock = this.option.onUnblock;
        $.blockUI.defaults.quirksmodeOffsetHack = this.option.quirksmodeOffsetHack;
        $.blockUI.defaults.allowBodyStretch = this.option.allowBodyStretch;
        $.blockUI.defaults.blockMsgClass = this.option.blockMsgClass;
        $.blockUI.defaults.ignoreIfBlocked = this.option.ignoreIfBlocked;
    }*/


    private blockChanged(isBlocked: boolean) {
        if (isBlocked) {
            $(this.content).block({
                title: this.title,
                message: this.message
            });
            this.element.classList.add('block-ui-content');
        } else {
            $(this.content).unblock();
            this.element.classList.remove('block-ui-content');
        }
    }
}
