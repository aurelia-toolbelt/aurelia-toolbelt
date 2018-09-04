```html
<abt-button-group toggle>
  <abt-checkbox-button repeat.for="product of products" value.bind="product" checked.bind="selectedProducts">
    ${product}
  </abt-checkbox-button>
</abt-button-group>
```
