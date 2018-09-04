```html
<abt-button-group size="sm" toggle>
  <abt-checkbox-button repeat.for="product of otherProducts" model.bind="product.id" checked.bind="selectedProductIds">
    ${product.name}
  </abt-checkbox-button>
</abt-button-group>
```
