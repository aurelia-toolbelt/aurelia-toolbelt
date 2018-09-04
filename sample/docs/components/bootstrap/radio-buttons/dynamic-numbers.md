```html
<abt-button-group label="Small Group" class="mr-2" size="sm" toggle>
  <abt-radio-button repeat.for="product of products" name="group1" model.bind="product.id" checked.bind="selectedProductId">
    ${product.id} - ${product.name}
  </abt-radio-button>
</abt-button-group>
```
