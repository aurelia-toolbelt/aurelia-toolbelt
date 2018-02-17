
import { customElement, bindable, bindingMode, inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';


@inject(HttpClient)
@customElement('aut-mark-down')
export class MarkDownItCustomElement {

  private isLoading = false;
  private myText = '';
  private editor: HTMLTextAreaElement;
  private preview: HTMLDivElement;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public showToolBar: boolean = false;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public showPreview: boolean = true;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public showEditor: boolean = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public src: string = '';

  private slotContainer: HTMLDivElement;

  constructor(private http: HttpClient) { }


  private afterAttached() {
    this.myText = this.slotContainer.innerHTML.replace('<!--slot-->' , '').trim();

    this.srcChanged(this.src);

  }

  private srcChanged(newValue: string) {
    this.isLoading = true;
    return this.http.get(newValue || this.src)
      .then((data) => {
        this.myText = data.response;
        this.isLoading = false;
      });
  }

  private addText(text: string, cursorPosition = 0) {

    if (!this.editor) { return; }

    const scrollPos = this.editor.scrollTop;
    let strPos = this.editor.selectionStart;

    // console.warn(`Scroll Top: ${scrollPos}`);
    // console.warn(`START: ${this.editor.selectionStart}`);
    // console.warn(`END: ${this.editor.selectionEnd}`);

    let front = (this.myText).substring(0, strPos);
    let back = (this.myText).substring(strPos, this.editor.value.length);

    this.editor.value = front + text + back;
    strPos = cursorPosition === 0 ? strPos + text.length : strPos + cursorPosition;

    this.editor.focus();

    this.editor.selectionStart = strPos;
    this.editor.selectionEnd = strPos;
    this.editor.scrollTo({
      top: scrollPos
    });

  }
}
