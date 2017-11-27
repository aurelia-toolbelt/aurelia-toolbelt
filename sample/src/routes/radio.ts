

export class Radio {

  // booleans

  private likesCake = null;

  // Numbers
  private products = [
    { id: 0, name: 'Motherboard' },
    { id: 1, name: 'CPU' },
    { id: 2, name: 'Memory' }
  ];

  private selectedProductId = 1;



  // objects

  private selectedProductObject = this.products[2];

  // strings

  private productsString = ['Motherboard', 'CPU', 'Memory'];
  private selectedProductstring = null;

  // matcher

  private selectedProductMatcher = { id: 0, name: 'Motherboard' };

  private productMatcher = (a, b) => a.id === b.id;



}
