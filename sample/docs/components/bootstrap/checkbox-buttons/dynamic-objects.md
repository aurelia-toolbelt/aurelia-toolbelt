```html
<abt-button-group class="mr-2" size="sm" toggle>
	<abt-checkbox-button repeat.for="product of productsObject" model.bind="product" checked.bind="selectedProductsObject">
	  ${product.id} - ${product.name}
	</abt-checkbox-button>
</abt-button-group>
```
