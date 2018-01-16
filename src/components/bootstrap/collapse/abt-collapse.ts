import { inject, customElement, containerless, bindable, bindingMode } from 'aurelia-framework';



@inject(Element)
@containerless()
@customElement('abt-collapse')
export class BootstrapCollapse {


  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public controlledBy: Array<HTMLElement>;


  private collapse: HTMLDivElement;

  constructor(private element: Element) {
  }


  private setControllerProperties(ctrl: any) {

    let isString = ctrl.nodeName === undefined;

    let controller: HTMLElement;

    if (isString) {
      controller = document.getElementById(ctrl);
    } else {
      controller = ctrl;
    }


    let id = this.collapse.id;

    controller.setAttribute('data-toggle', 'collapse');
    controller.setAttribute('aria-expanded', 'false');

    let prevAriaControls = controller.getAttribute('aria-controls') || '';


    controller.setAttribute('data-target', prevAriaControls ? '.abt-collapse-multiple' : `#${id}`);

    controller.setAttribute('aria-controls', `${id} ${prevAriaControls}`);

    if (controller.nodeName === 'A') {
      controller.setAttribute('href', `#${id}`);
      controller.setAttribute('role', `button`);
    }

  }

  private afterAttached() {

    if (this.controlledBy && !Array.isArray(this.controlledBy)) {
      this.setControllerProperties(this.controlledBy);
      return true;
    } else if (Array.isArray(this.controlledBy)) {

      let counter = this.controlledBy.length;

      while (counter--) {
        let controller = this.controlledBy[counter];
        this.setControllerProperties(controller);
      }

      return true;

    }
  }

}
