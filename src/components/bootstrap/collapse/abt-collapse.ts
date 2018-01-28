import { inject, customElement, containerless, bindable, bindingMode } from 'aurelia-framework';



@inject(Element)
@containerless()
@customElement('abt-collapse')
export class BootstrapCollapse {

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public controlledBy: Array<HTMLElement>;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsShow: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsShown: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsHide: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsHidden: Function;

  private collapse: HTMLDivElement;

  constructor(private element: Element) {
  }


  private setControllerProperties(ctrl: any) {

    let isString = typeof ctrl === 'string';

    let controller: HTMLElement;

    if (isString) {
      controller = document.getElementById(ctrl);
    } else {
      controller = ctrl;
    }


    let id = this.collapse.id;

    controller.setAttribute('data-toggle', 'collapse');
    controller.setAttribute('aria-expanded', 'false');

    let prevAriaControls = (controller.getAttribute('aria-controls') || '').trim();

    if (controller.nodeName.toUpperCase() === 'A') {
      controller.onclick = (event: Event) => {
        event.preventDefault();
        return false;
      };
      controller.setAttribute('href', `#${id}`);
      controller.setAttribute('role', `button`);
    }

    controller.setAttribute('data-target', prevAriaControls ? '.abt-collapse-multiple' : `#${id}`);

    if (prevAriaControls) {
      if (prevAriaControls.trim().split(' ').length === 1) {
        document.getElementById(`${prevAriaControls}`).classList.add('abt-collapse-multiple');
      }
      this.collapse.classList.add('abt-collapse-multiple');
    }

    controller.setAttribute('aria-controls', `${id} ${prevAriaControls}`);

  }

  private setEvents() {
    if (this.bsShow) {
      $(this.collapse).on('show.bs.collapse', () => {
        if (this.bsShow) {
          this.bsShow();
        }
      });
    }

    if (this.bsShown) {
      $(this.collapse).on('shown.bs.collapse', () => {
        if (this.bsShown) {
          this.bsShown();
        }
      });
    }

    if (this.bsHide) {
      $(this.collapse).on('hide.bs.collapse', () => {
        if (this.bsHide) {
          this.bsHide();
        }
      });
    }

    if (this.bsHidden) {
      $(this.collapse).on('hidden.bs.collapse', () => {
        if (this.bsHidden) {
          this.bsHidden();
        }
      });
    }

  }

  private afterAttached() {

    this.setEvents();

    if (this.collapse.parentElement.parentElement.classList.contains('abt-accordion')) {
      this.collapse.setAttribute('data-parent', `#${this.collapse.parentElement.parentElement.id}`);
    }

    if (this.controlledBy && !Array.isArray(this.controlledBy)) {
      this.setControllerProperties(this.controlledBy);
      return true;

    } else if (this.controlledBy && Array.isArray(this.controlledBy)) {

      let counter = this.controlledBy.length;

      while (counter--) {
        let controller = this.controlledBy[counter];
        this.setControllerProperties(controller);
      }
    }

    return true;
  }

  private detached() {
    $(this.collapse).off('show.bs.collapse');
    $(this.collapse).off('shown.bs.collapse');
    $(this.collapse).off('hide.bs.collapse');
    $(this.collapse).off('hidden.bs.collapse');
    $(this.collapse).collapse('dispose');
  }

}
