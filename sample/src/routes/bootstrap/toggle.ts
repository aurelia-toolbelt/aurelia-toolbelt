export class BootstrapToggleDemo {

  private cpu = true;

    // array of strings
    private products = ['Motherboard', 'CPU', 'Memory'];
    private selectedProducts = ['CPU'];


    // array of numbers
    private otherProducts = [
        { id: 0, name: 'Motherboard' },
        { id: 1, name: 'CPU' },
        { id: 2, name: 'Memory' }
    ];
    private selectedProductIds = [];


    // array of objects
    private productsObject = [
        { id: 0, name: 'Motherboard' },
        { id: 1, name: 'CPU' },
        { id: 2, name: 'Memory' }
    ];

    private selectedProductsObject = [];


    // array of objects with matcher


    private another_motherboard: any = { id: 0, name: 'Motherboard' };
    private another_cpu = { id: 1, name: 'CPU' };
    private another_memory: any = { id: 2, name: 'Memory' };

    private selectedProductsMatcher = [
        { id: 1, name: 'CPU' },
        { id: 2, name: 'Memory' }
    ];

    private productMatcher = (a, b) => {
        return a.id === b.id;
    }



}
