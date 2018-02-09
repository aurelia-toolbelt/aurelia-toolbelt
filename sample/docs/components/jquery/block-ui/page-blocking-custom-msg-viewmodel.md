```ts
export class Blockui {

    private blockPageCustomMsgText = 'Block page';
    private blockPageCustomMsg = false;
    private blockPageCustomMsgOption: IAutBlockUIOption = {};

    private attached() {
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

    private blockThePageCustomMsg() {
        this.blockPageCustomMsg = !this.blockPageCustomMsg;
        this.timer(5, (t) => { this.blockPageCustomMsgText = `Unblock page in ${t} second(s)`; }, () => {
            this.blockPageCustomMsgText = 'Block page';
            this.blockPageCustomMsg = !this.blockPageCustomMsg;
        });

    }
}
```