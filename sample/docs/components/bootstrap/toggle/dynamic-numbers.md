```html
<div repeat.for="product of otherProducts">
  <abt-toggle model.bind="product.id" checked.bind="selectedProductIds">
    ${product.name}
  </abt-toggle>
</div>

<abt-alert type="secondary" class="mt-3 text-center">
  Selected product IDs:
  <b>${selectedProductIds}</b>
</abt-alert>
```
