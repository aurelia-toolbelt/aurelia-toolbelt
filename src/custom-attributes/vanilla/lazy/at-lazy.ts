import { customAttribute, bindingMode, bindable } from "aurelia-framework";
import { inject } from "aurelia-dependency-injection";

import * as lozad from "lozad";

@inject(Element)
@customAttribute("at-lazy")
export class LazyCustomAttribute {
  @bindable({ defaultBindingMode: bindingMode.oneTime })
  public rootMargin: string;
  @bindable({ defaultBindingMode: bindingMode.oneTime })
  public threshold: number;
  @bindable({ defaultBindingMode: bindingMode.oneTime })
  public dataSrc: string;
  @bindable({ defaultBindingMode: bindingMode.oneTime })
  public dataSrcSet: string;
  @bindable({ defaultBindingMode: bindingMode.oneTime })
  public dataBackgroundImage: string;

  constructor(private element: Element) {}

  attached() {
    const el = this.element;

    el.classList.add("lozad");
    if (this.dataSrc != null) {
      el.setAttribute('data-src',this.dataSrc)
    }
    if (this.dataSrcSet != null) {
      el.setAttribute('data-srcset',this.dataSrcSet)
    }
    if (this.dataBackgroundImage != null) {
      el.setAttribute('data-background-image',this.dataBackgroundImage)
    }

    // @ts-ignore
    const observer = lozad(el, {
      rootMargin: this.rootMargin, // syntax similar to that of CSS Margin
      threshold: this.threshold // ratio of element convergence
    });
    observer.observe();
  }
}
