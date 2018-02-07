```html
<div repeat.for="product of products">
  <abt-toggle on-type="success" off-type="danger" size="small" value.bind="product" checked.bind="selectedProducts"> ${product}
  </abt-toggle>
</div>

<abt-alert type="secondary" class="mt-3 text-center">
  Selected products:
  <b>${selectedProducts}</b>
</abt-alert>
```
