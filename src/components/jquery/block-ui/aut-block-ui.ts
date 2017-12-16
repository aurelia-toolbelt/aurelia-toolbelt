import { transient, customElement, inject, containerless, bindable, bindingMode, observable } from 'aurelia-framework';
import './scripts/jquery.blockUI.js';

import * as $ from 'jquery';
import { IAutBlockUIOptions, SpinnerType } from './aut-block-ui-options';

@transient()
@customElement('aut-block-ui')
@inject(Element, 'aut-block-ui-option')
export class JQueryBlockUI {

    @bindable({ defaultBindingMode: bindingMode.oneWay }) public block: string | boolean = false;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public title: string = null;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public message: string = null;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public spinnerType: SpinnerType = 'bounce';
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public spinnerColor: string;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public spinnerSize: string;

    private content: HTMLDivElement;
    constructor(private element: Element, private option: IAutBlockUIOptions) {

    }
    private attached() {
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
        $.blockUI.defaults.baseZ = this.option.baseZ || 1000;
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

        this.blockChanged(this.block);

    }

    private blockChanged(isBlocked: boolean | string) {
        let option = {
            message: this.message
        };
        if (isBlocked) {
            $(this.content).block(option);
            this.element.classList.add('block-ui-content');
            $(window).resize(() => {
                if (this.element.classList.contains('block-ui-content')) {
                    $(this.content).block(option);
                }
            });
        } else {
            $(this.content).unblock();
            this.element.classList.remove('block-ui-content');
        }
    }
}
