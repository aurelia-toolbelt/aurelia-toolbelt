import { IAutBlockUIOption } from './../../../../src/components/jquery/block-ui/aut-block-ui-option';
import { bindingMode, bindable } from 'aurelia-framework';


export class Blockui {

    private blockPageSpinnerText = 'Block page';
    private blockPageStyledSpinnerText = 'Block page';
    private blockPageDefaultMsgText = 'Block page';
    private blockPageCustomMsgText = 'Block page';

    private blockPageSpinner = false;
    private blockPageStyledSpinner = false;
    private blockPageDefaultMsg = false;
    private blockPageCustomMsg = false;

    private blockPageStyledSpinnerOption: IAutBlockUIOption = {};
    private blockPageDefaultMsgOption: IAutBlockUIOption = {};
    private blockPageCustomMsgOption: IAutBlockUIOption = {};


    private blockValue2 = true;
    private blockOption: IAutBlockUIOption = {};

    private attached() {
        this.blockPageStyledSpinnerOption.spinnerSize = '25px';
        this.blockPageStyledSpinnerOption.spinnerColor = '.info';

        this.blockPageDefaultMsgOption.useSpinner = false;

        this.blockPageCustomMsgOption.useSpinner = false;
        this.blockPageCustomMsgOption.message = '<h1><img src="/images/spinner.gif" /> Just a moment...</h1>';

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

    private toggleBlock2() {
        this.blockValue2 = !this.blockValue2;
    }
}
