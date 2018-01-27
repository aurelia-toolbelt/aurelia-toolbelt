```ts
import { IBreadcrumbItem } from 'aurelia-toolbelt';

export class Breadcrumb {

  private new_title = 'Test';
  private items: Array<IBreadcrumbItem> = [];


  private push() {
    this.items.push({ title: this.new_title });
  }

  private pop() {
    this.items.pop();
  }

  private activate() {
     this.items = [
      {
        title: 'Bootstrap',
        url: '#/bootstrap'
      },
      {
        title: 'Breadcrumb',
        url: '#/bootstrap/breadcrumb'
      }];
    return true;
  }
}
```