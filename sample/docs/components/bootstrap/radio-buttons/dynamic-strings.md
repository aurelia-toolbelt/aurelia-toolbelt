```html
<abt-button-group label="Small Group" class="mr-2" size="sm" toggle>
  <abt-radio-button switch slim color="info" repeat.for="product of productsString" name="group5" value.bind="product"
    checked.bind="selectedProductstring">
    ${product}
  </abt-radio-button>
</abt-button-group>
```
