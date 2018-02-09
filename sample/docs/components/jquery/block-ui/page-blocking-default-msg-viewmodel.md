```ts
export class Blockui {

    private blockPageDefaultMsgText = 'Block page';
    private blockPageDefaultMsg = false;
    private blockPageDefaultMsgOption: IAutBlockUIOption = {};

    private attached() {
        this.blockPageDefaultMsgOption.useSpinner = false;
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

    private blockThePageDefaultMsg() {
        this.blockPageDefaultMsg = !this.blockPageDefaultMsg;
        this.timer(5, (t) => { this.blockPageDefaultMsgText = `Unblock page in ${t} second(s)`; }, () => {
            this.blockPageDefaultMsgText = 'Block page';
            this.blockPageDefaultMsg = !this.blockPageDefaultMsg;
        });

    }
}
```