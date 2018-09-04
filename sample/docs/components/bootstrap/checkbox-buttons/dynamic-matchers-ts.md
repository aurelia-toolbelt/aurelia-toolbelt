```ts

export class CheckboxButtons {
  // array of objects with matcher
  private myMotherBoard = { id: 0, name: 'Motherboard' };
  private myCpu = { id: 1, name: 'CPU' };
  private myMemory = { id: 2, name: 'Memory' };

  private selectedProductsMatcher = [
    { id: 1, name: 'CPU' },
    { id: 2, name: 'Memory' }
  ];

  private productMatcher = (a, b) => {
    return a.id === b.id;
  }

```
