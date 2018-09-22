```ts
export class AlertDemo {

  private show_countdown_alert = false;
  private secondsRemained: Number = 10;

  private showAlert() {
    this.show_countdown_alert = true;
  }

  private countDownHasChanged(currentCounter: number) {
    this.secondsRemained = currentCounter;
    if (this.secondsRemained === 0) {
      this.secondsRemained = 10;
    }
  }

}
```
