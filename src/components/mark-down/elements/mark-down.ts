
import { customElement, bindable, bindingMode, inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';




@inject(HttpClient)
@customElement('mark-down')
export class MarkDownItCustomElement {

  private myText = '';
  private editor: HTMLTextAreaElement;
  private preview: HTMLDivElement;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public showPreview: boolean = false;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public showEditor: boolean = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public src: string = '';


  constructor(private http: HttpClient) { }

  private srcChanged(newValue: string) {
    this.http.get(newValue)
      .then((data) => {
        this.myText = data.response;
      });
  }

  private addText(text: string) {

    if (!this.editor) { return; }

    const scrollPos = this.editor.scrollTop;
    let strPos = this.editor.selectionStart;

    console.warn(`START: ${this.editor.selectionStart}`);
    console.warn(`END: ${this.editor.selectionEnd}`);

    let front = (this.myText).substring(0, strPos);
    let back = (this.myText).substring(strPos, this.editor.value.length);

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
