

export class CheckboxButtons {


  // booleans

  private motherboard = false;
  private cpu = true;
  private memory = false;


  // array of strings
  private products = ['Motherboard', 'CPU', 'Memory'];
  private selectedProducts = ['Memory'];


  // array of numbers
  private otherProducts = [
    { id: 0, name: 'Motherboard' },
    { id: 1, name: 'CPU' },
    { id: 2, name: 'Memory' }
  ];
  private selectedProductIds = [0];


  // array of objects

  private productsObject = [
    { id: 0, name: 'Motherboard' },
    { id: 1, name: 'CPU' },
    { id: 2, name: 'Memory' }
  ];

  private selectedProductsObject = [];


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


}
