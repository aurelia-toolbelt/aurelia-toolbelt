```html
<abt-button-group label="Small Group" class="mr-2" size="sm" toggle>
  <abt-radio-button color="danger-o" repeat.for="product of products" name="group2" model.bind="product"
    checked.bind="selectedProductObject">
    ${product.id} - ${product.name}
  </abt-radio-button>
</abt-button-group>
```
