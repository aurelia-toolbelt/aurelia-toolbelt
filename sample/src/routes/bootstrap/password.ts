export class BootstrapPassword {
    public requirements = {
        minLength: 5
    };
    public scoreRange = {
        '40': { message: 'veryWeak', color: 'red' },
        '80': { message: 'weak', color: 'khaki' },
        '120': { message: 'medium', color: 'orange' },
        '180': { message: 'strong', color: 'maroon' },
        '200': { message: 'veryStrong', color: 'blue' },
        '_': { message: 'perfect', color: 'green' }
    };
}
