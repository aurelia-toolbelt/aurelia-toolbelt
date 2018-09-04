```ts
export class RadioButtons {

  private products = [
    { id: 0, name: 'Motherboard' },
    { id: 1, name: 'CPU' },
    { id: 2, name: 'Memory' }
  ];

  // matcher
  private selectedProductMatcher = { id: 0, name: 'Motherboard' };
  private productMatcher = (a, b) => a.id === b.id;

```
