```ts
export class DropdownDemo {

  private products = [
    { id: 0, name: 'Motherboard' },
    { id: 1, name: 'CPU' },
    { id: 2, name: 'Memory' }
  ];

  private selected_product_matcher = { id: 1, name: 'CPU' };

  private productMatcher = (a, b) => a === b || (a.name === b.name);

}

```
