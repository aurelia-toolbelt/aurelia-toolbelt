```ts
export class Blockui {

    private blockPageDomMsgText = 'Block page';
    private blockPageDomMsg = false;
    private blockPageDomMsgOption: IAutBlockUIOption = {};

    private attached() {
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

    private blockThePageDomMsg() {
        this.blockPageDomMsg = !this.blockPageDomMsg;
        this.timer(5, (t) => { this.blockPageDomMsgText = `Unblock page in ${t} second(s)`; }, () => {
            this.blockPageDomMsgText = 'Block page';
            this.blockPageDomMsg = !this.blockPageDomMsg;
        });

    }
}
```