import { bindable, noView, customElement, bindingMode, DOM, inject, PLATFORM } from 'aurelia-framework';
import { Uuid } from '../../../utilities/vanilla/uuid';

const Nanobar = require('nanobar');

@inject(Uuid)
@customElement('at-nanobar')
@noView([PLATFORM.moduleName('./at-nanobar.css')])
export class AtNanobar {

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public parent: HTMLElement | string;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public central: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public shadow: boolean | string = true;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public class: string = 'at-nanobar';

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public loading = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public type = 'primary';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public percent: number = null;


  @bindable({ defaultBindingMode: bindingMode.oneWay }) public increment: number = 0.5;


  private trickle = true;
  private trickleSpeed = 200;

  private id: string;
  private options: any;
  private nanobar: any;
  private intervalHandlerId: any = null;


  constructor(idGenerator: Uuid, private element: Element) {
    this.id = idGenerator.Uuidv4ForId();
  }

  private bind() {

    const onlyCentralAttribute = (this.central === '' && this.element.hasAttribute('central'));
    this.central = onlyCentralAttribute || this.central.toString() === 'true';


    // let target = (typeof this.parent === 'string') ? document.getElementById(this.parent) : this.parent;

    this.options = {
      id: this.id,
      classname: this.class,
      target: this.parent
    };

    let style = `#${this.id}>.bar {
        width: 0;
        height: 100%;
        transition: height .3s;
        background: var(--${this.type});
        box-shadow: ${this.shadow ? '0 0 10px ' + `var(--${this.type})` : '0 0 0'};
        border-radius: 4px;
        margin: 0 ${this.central ? 'auto' : '0'};
      }
    `;
    DOM.injectStyles(style);

    this.nanobar = new Nanobar(this.options);
  }

  private showNanoBar() {
    let current = 0;
    if (this.trickle) {
      this.intervalHandlerId = setInterval(() => {
        this.nanobar.go(current);
        current += this.increment;
        if (current >= (100 /*+ increment*/)) {
          clearInterval(this.intervalHandlerId);
        }
      }, this.trickleSpeed);
    }
  }

  private percentChanged(newValue: number) {
    this.nanobar.go(Number(newValue));
  }

  private loadingChanged(newValue: boolean) {

    if (this.intervalHandlerId) {
      clearInterval(this.intervalHandlerId);
    }

    if (newValue) {
      this.showNanoBar();
    } else {
      this.nanobar.go(100);
    }
  }
}
