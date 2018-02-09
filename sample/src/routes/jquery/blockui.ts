import { IAutBlockUIOption } from './../../../../src/components/jquery/block-ui/aut-block-ui-option';
import { bindingMode, bindable } from 'aurelia-framework';


export class Blockui {


    private blockPageSpinnerText = 'Block page';
    private blockPageStyledSpinnerText = 'Block page';
    private blockPageDefaultMsgText = 'Block page';
    private blockPageCustomMsgText = 'Block page';
    private blockPageCustomStyleText = 'Block page';
    private blockPageDomMsgText = 'Block page';

    private blockPageSpinner = false;
    private blockPageStyledSpinner = false;
    private blockPageDefaultMsg = false;
    private blockPageCustomMsg = false;
    private blockPageCustomStyle = false;
    private blockPageDomMsg = false;

    private blockPageStyledSpinnerOption: IAutBlockUIOption = {};
    private blockPageDefaultMsgOption: IAutBlockUIOption = {};
    private blockPageCustomMsgOption: IAutBlockUIOption = {};
    private blockPageCustomStyleOption: IAutBlockUIOption = {};
    private blockPageDomMsgOption: IAutBlockUIOption = {};

    private blockElementText = 'Block';
    private blockElement = false;

    private attached() {
        this.blockPageStyledSpinnerOption.spinnerSize = '25px';
        this.blockPageStyledSpinnerOption.spinnerColor = '.info';

        this.blockPageDefaultMsgOption.useSpinner = false;

        this.blockPageCustomMsgOption.useSpinner = false;
        this.blockPageCustomMsgOption.message = '<h1><img src="/images/spinner.gif" /> Just a moment...</h1>';

        this.blockPageCustomStyleOption.useSpinner = false;

        this.blockPageCustomStyleOption.css = {};
        this.blockPageCustomStyleOption.css.backgroundColor = '#f00';
        this.blockPageCustomStyleOption.css.color = '#fff';

        this.blockPageDomMsgOption.useSpinner = false;
        this.blockPageDomMsgOption.message = document.getElementById('domMessage');
    }

    private timer(time: number, onRunning: Function, onStop: Function) {
        let timeleft = time;
        let downloadTimer = setInterval(() => {
            timeleft -= 1;
            onRunning(timeleft);
            if (timeleft <= 0) {
                clearInterval(downloadTimer);
                onStop();
            }
        }, 1000);
    }

    private blockThePageSpinner() {
        this.blockPageSpinner = !this.blockPageSpinner;
        this.timer(5, (t) => { this.blockPageSpinnerText = `Unblock page in ${t} second(s)`; }, () => {
            this.blockPageSpinnerText = 'Block page';
            this.blockPageSpinner = !this.blockPageSpinner;
        });

    }

    private blockThePageStyledSpinner() {
        this.blockPageStyledSpinner = !this.blockPageStyledSpinner;
        this.timer(5, (t) => { this.blockPageStyledSpinnerText = `Unblock page in ${t} second(s)`; }, () => {
            this.blockPageStyledSpinnerText = 'Block page';
            this.blockPageStyledSpinner = !this.blockPageStyledSpinner;
        });

    }

    private blockThePageDefaultMsg() {
        this.blockPageDefaultMsg = !this.blockPageDefaultMsg;
        this.timer(5, (t) => { this.blockPageDefaultMsgText = `Unblock page in ${t} second(s)`; }, () => {
            this.blockPageDefaultMsgText = 'Block page';
            this.blockPageDefaultMsg = !this.blockPageDefaultMsg;
        });

    }

    private blockThePageCustomMsg() {
        this.blockPageCustomMsg = !this.blockPageCustomMsg;
        this.timer(5, (t) => { this.blockPageCustomMsgText = `Unblock page in ${t} second(s)`; }, () => {
            this.blockPageCustomMsgText = 'Block page';
            this.blockPageCustomMsg = !this.blockPageCustomMsg;
        });

    }

    private blockThePageCustomStyle() {
        this.blockPageCustomStyle = !this.blockPageCustomStyle;
        this.timer(5, (t) => { this.blockPageCustomStyleText = `Unblock page in ${t} second(s)`; }, () => {
            this.blockPageCustomStyleText = 'Block page';
            this.blockPageCustomStyle = !this.blockPageCustomStyle;
        });

    }

    private blockThePageDomMsg() {
        this.blockPageDomMsg = !this.blockPageDomMsg;
        this.timer(5, (t) => { this.blockPageDomMsgText = `Unblock page in ${t} second(s)`; }, () => {
            this.blockPageDomMsgText = 'Block page';
            this.blockPageDomMsg = !this.blockPageDomMsg;
        });

    }

    private onBlockElement() {
        this.blockElement = !this.blockElement;
        if (this.blockElement) {
            this.blockElementText = 'Unblock';
        } else {
            this.blockElementText = 'Block';
        }
    }
}
