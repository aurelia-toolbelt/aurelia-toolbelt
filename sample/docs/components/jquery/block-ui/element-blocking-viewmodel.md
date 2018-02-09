```ts
export class Blockui {

    private blockElementText = 'Block';
    private blockElement = false;

    private onBlockElement() {
        this.blockElement = !this.blockElement;
        if (this.blockElement) {
            this.blockElementText = 'Unblock';
        } else {
            this.blockElementText = 'Block';
        }
    }
}
```