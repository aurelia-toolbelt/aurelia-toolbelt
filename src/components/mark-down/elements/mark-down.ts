
import { customElement, bindable, bindingMode, inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';




@inject(HttpClient)
@customElement('mark-down')
export class MarkDownItCustomElement {


    private myText = '';

    private editor: HTMLTextAreaElement;
    private showPreview = true;

    @bindable({ defaultBindingMode: bindingMode.oneWay }) public src: string = '';


    constructor(private http: HttpClient) {
    }

    private srcChanged(newValue: string) {
        this.http.get(newValue)
            .then((data) => {
                this.myText = data.response;
            });
    }

    private togglePreview() {
        this.showPreview = !this.showPreview;
    }

    private addText(text: string) {

        if (!this.editor) { return; }

        const scrollPos = this.editor.scrollTop;
        let strPos = this.editor.selectionStart;

        console.log(`Start: ${this.editor.selectionStart}`);

        let front = (this.editor.value).substring(0, strPos);
        let back = (this.editor.value).substring(strPos, this.editor.value.length);

        console.log(`front: ${front}`);
        console.log(`text: ${text}`);
        console.log(`back: ${back}`);

        this.editor.value = front + text + back;
        strPos = strPos + text.length;

        this.editor.focus();

        this.editor.selectionStart = strPos;
        this.editor.selectionEnd = strPos;
        this.editor.scrollTo({
            top: scrollPos
        });

    }
}
