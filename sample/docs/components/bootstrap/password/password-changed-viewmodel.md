```ts
export class BootstrapPassword {

  private requirements = {
    minLength: 5,
    maxLength: 10,
    uppercaseLettersMinLength: 1,
    lowercaseLettersMinLength: 2,
    numbersMinLength: 1,
    symbolsMinLength: 1,
    include: ['s'],
    exclude: ['#', '$'],
    startsWith: 'p',
    endsWith: 'd',
    blackList: ['p@ssw0rd']
  };

  private scoreRange = {
    '40': { message: 'veryWeak', color: '.danger' },
    '80': { message: 'weak', color: '.warning' },
    '120': { message: 'medium', color: '#D8B600' },
    '180': { message: 'strong', color: '#6495ED' },
    '200': { message: 'veryStrong', color: 'green' },
    '_': { message: 'perfect', color: 'darkgreen' }
  };

  private passwordChanged(result: any, colorStatus: any) {
    let resultText = JSON.stringify(result, null, '\t');
    let colorStatusText = JSON.stringify(colorStatus, null, '\t');
  }
}
```