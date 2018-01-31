```ts
export class BootstrapPassword {

  public scoreRange = {
    '40': { message: 'veryWeak', color: '.danger' },
    '80': { message: 'weak', color: '.warning' },
    '120': { message: 'medium', color: '#D8B600' },
    '180': { message: 'strong', color: '#6495ED' },
    '200': { message: 'veryStrong', color: 'green' },
    '_': { message: 'perfect', color: 'darkgreen' }
  };
  
}
```
