```ts
export class BootstrapToggleDemo {

    private another_motherboard: any = { id: 0, name: 'Motherboard' };
    private another_cpu = { id: 1, name: 'CPU' };
    private another_memory: any = { id: 2, name: 'Memory' };

    // array of objects with matcher
    private selectedProductsMatcher = [
      { id: 1, name: 'CPU' },
      { id: 2, name: 'Memory' }
    ];

    private productMatcher = (a, b) => {
        return a.id === b.id;
    }

}
```
