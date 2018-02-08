import { IAutBlockUIOption } from './../../../../src/components/jquery/block-ui/aut-block-ui-option';


export class Blockui {
    private blockValue1 = false;
    private blockValue2 = true;

    private blockPageOption: IAutBlockUIOption = {};
    private blockOption: IAutBlockUIOption = {};

    private attached() {
        this.blockOption.spinnerSize = '14px';
        this.blockOption.spinnerColor = '.danger';

        this.blockPageOption.useSpinner = false;
    }

    private toggleBlock1() {
        // setInterval(() => { this.blockValue1 = !this.blockValue1; }, 50000);
        this.blockValue1 = !this.blockValue1;
    }
    private toggleBlock2() {
        this.blockValue2 = !this.blockValue2;
    }
}
