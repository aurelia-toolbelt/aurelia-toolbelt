```ts
export class Blockui {

    private blockPageCustomStyleText = 'Block page';
    private blockPageCustomStyle = false;
    private blockPageCustomStyleOption: IAutBlockUIOption = {};

    private attached() {
        this.blockPageCustomStyleOption.css = {};
        this.blockPageCustomStyleOption.css.backgroundColor = '#f00';
        this.blockPageCustomStyleOption.css.color = '#fff';
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

    private blockThePageCustomStyle() {
        this.blockPageCustomStyle = !this.blockPageCustomStyle;
        this.timer(5, (t) => { this.blockPageCustomStyleText = `Unblock page in ${t} second(s)`; }, () => {
            this.blockPageCustomStyleText = 'Block page';
            this.blockPageCustomStyle = !this.blockPageCustomStyle;
        });

    }
}
```