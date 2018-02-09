```ts
export class Blockui {

    private blockPageStyledSpinnerText = 'Block page';
    private blockPageStyledSpinner = false;
    private blockPageStyledSpinnerOption: IAutBlockUIOption = {};

    private attached() {
        this.blockPageStyledSpinnerOption.spinnerSize = '25px';
        this.blockPageStyledSpinnerOption.spinnerColor = '.info';
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
	
    private blockThePageStyledSpinner() {
        this.blockPageStyledSpinner = !this.blockPageStyledSpinner;
        this.timer(5, (t) => { this.blockPageStyledSpinnerText = `Unblock page in ${t} second(s)`; }, () => {
            this.blockPageStyledSpinnerText = 'Block page';
            this.blockPageStyledSpinner = !this.blockPageStyledSpinner;
        });

    }
}
```