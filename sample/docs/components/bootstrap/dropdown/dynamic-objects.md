```html
<abt-dropdown value.bind="selectedProduct" type="secondary" title="choose...">
  <abt-dropdown-item model.bind="null">
    choose...
  </abt-dropdown-item>
  <abt-dropdown-divider></abt-dropdown-divider>
  <abt-dropdown-item repeat.for="product of products" model.bind="product">
    ${product.id} - ${product.name}
  </abt-dropdown-item>
</abt-dropdown>

<abt-alert type="secondary"  class="text-center">
  <span>
    Selected product: ${selectedProduct.id} - ${selectedProduct.name}
  </span>
</abt-alert>
```
