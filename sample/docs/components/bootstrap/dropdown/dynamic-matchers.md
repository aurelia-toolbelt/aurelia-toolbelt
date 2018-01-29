```html
 <abt-dropdown class="mb-2" value.bind="selected_product_matcher" matcher.bind="productMatcher" type="secondary" title="choose...">
  <abt-dropdown-item model.bind="null">
    choose...
  </abt-dropdown-item>
  <abt-dropdown-divider></abt-dropdown-divider>
  <abt-dropdown-item repeat.for="product of products" model.bind="product">
    ${product.id} - ${product.name}
  </abt-dropdown-item>
</abt-dropdown>

<abt-alert type="secondary" class="text-center">
  <span>
    Selected product: &nbsp; ${selected_product_matcher.id} - ${selected_product_matcher.name}
  </span>
</abt-alert>
```
