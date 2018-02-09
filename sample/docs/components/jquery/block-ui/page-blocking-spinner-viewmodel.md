```ts
import { bindingMode, bindable } from 'aurelia-framework';

export class Blockui {
    private blockPageSpinnerText = 'Block page';
    private blockPageSpinner = false;

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
}
```