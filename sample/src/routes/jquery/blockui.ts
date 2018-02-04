


export class Blockui {
    private blockValue1 = false;
    private blockValue2 = true;

    private toggleBlock1() {
        setInterval(() => { this.blockValue1 = !this.blockValue1; }, 7000);
    }
    private toggleBlock2() {
        this.blockValue2 = !this.blockValue2;
    }
}
