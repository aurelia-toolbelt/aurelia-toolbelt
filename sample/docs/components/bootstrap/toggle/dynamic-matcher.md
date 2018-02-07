```html
<div>
  <abt-toggle size="small" model.bind="another_motherboard" matcher.bind="productMatcher" checked.bind="selectedProducts">
    Motherboard
  </abt-toggle>
</div>

<div>
  <abt-toggle size="small" model.bind="another_cpu" matcher.bind="productMatcher" checked.bind="selectedProducts">
    CPU
  </abt-toggle>
</div>

<div>
  <abt-toggle size="small" model.bind="another_memory" matcher.bind="productMatcher" checked.bind="selectedProducts">
    Memory
  </abt-toggle>
</div>

<abt-alert type="secondary" class="mt-3 text-center">
  <b>
    Selected Products:
  </b>
  <hr />
  <div repeat.for="product of selectedProducts">
    ${product.id} - ${product.name}
  </div>
</abt-alert>
```
