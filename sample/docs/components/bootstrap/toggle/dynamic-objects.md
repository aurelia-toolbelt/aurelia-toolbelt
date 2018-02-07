```html
<div repeat.for="product of products">
  <abt-toggle model.bind="product"checked.bind="selectedProducts"> ${product.id - ${product.name}
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
