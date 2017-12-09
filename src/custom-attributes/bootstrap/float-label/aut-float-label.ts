import { inject, noView } from 'aurelia-framework';
import { customAttribute } from 'aurelia-templating';
import { bindingMode } from 'aurelia-binding';
import './styles/bootstrap-float-label.css';

@customAttribute('aut-float-label', bindingMode.twoWay)
@inject(Element)
@noView()
export class FloatLabelAttribute {

  private value: string;
  private validTypes: string[] = ['date', 'datetime-local', 'email', 'file', 'month',
    'number', 'password', 'range', 'search', 'tel', 'text', 'time', 'url', 'week'];

  private element: HTMLInputElement;

  constructor(element: Element) {
    this.element = <HTMLInputElement>element;
  }

  private attached() {
    const isInput = this.element instanceof HTMLInputElement;

    if (!isInput) { return; }

    const type = this.element.getAttribute('type');

    const isValidType = this.validTypes.findIndex(x => x.toLocaleLowerCase() === type.toLocaleLowerCase()) > -1;
    if (!isValidType) { return; }



    const span: HTMLSpanElement = document.createElement('span');
    span.classList.add('has-float-label');

    const label: HTMLLabelElement = document.createElement('label');
    label.innerText = this.value || this.element.getAttribute('placeholder') || '';

    label.onclick = () => { this.element.focus(); };

    this.element.parentElement.appendChild(span);
    this.element.parentElement.removeChild(this.element);
    span.appendChild(this.element);
    span.appendChild(label);

  }
}
