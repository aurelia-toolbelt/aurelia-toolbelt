```html
<abt-button-group toggle>
  <abt-radio-button switch name="group3" color="info" model.bind="products[0]" matcher.bind="productMatcher"
    checked.bind="selectedProductMatcher">
    Motherboard</abt-radio-button>
  <abt-radio-button switch color="warning" name="group3" model.bind="products[1]" matcher.bind="productMatcher"
    checked.bind="selectedProductMatcher">
    CPU</abt-radio-button>
  <abt-radio-button switch color="success" name="group3" model.bind="products[2]" matcher.bind="productMatcher"
    checked.bind="selectedProductMatcher">
    Memory</abt-radio-button>
</abt-button-group>
```
