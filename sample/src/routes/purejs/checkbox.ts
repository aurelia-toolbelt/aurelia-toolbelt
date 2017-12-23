

export class Checkbox {


  // booleans

  private motherboard = false;
  private cpu = true;
  private memory = false;


  // array of strings
  private products = ['Motherboard', 'CPU', 'Memory'];
  private selectedProducts = [];


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


  private mymotherBoard: any = { id: 0, name: 'Motherboard' };
  private mycpu = { id: 1, name: 'CPU' };
  private mymemory: any = { id: 2, name: 'Memory' };

  private selectedProductsMatcher = [
    { id: 1, name: 'CPU' },
    { id: 2, name: 'Memory' }
  ];

  private productMatcher = (a, b) => {
    return a.id === b.id;
  }


}
