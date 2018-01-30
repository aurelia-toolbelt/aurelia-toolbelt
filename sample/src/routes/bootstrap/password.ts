export class BootstrapPassword {

    public requirements = {
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

    public scoreRange = {
        '40': { message: 'veryWeak', color: 'red' },
        '80': { message: 'weak', color: 'khaki' },
        '120': { message: 'medium', color: 'orange' },
        '180': { message: 'strong', color: '.success' },
        '200': { message: 'veryStrong', color: 'blue' },
        '_': { message: 'perfect', color: 'green' }
    };
}
