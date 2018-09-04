```html
<abt-button-group label="Small Group" class="mr-2" size="sm" toggle>

	<abt-checkbox-button model.bind="myMotherBoard" matcher.bind="productMatcher" checked.bind="selectedProductsMatcher">
	  Motherboard
	</abt-checkbox-button>

	<abt-checkbox-button model.bind="myCpu" matcher.bind="productMatcher" checked.bind="selectedProductsMatcher">
	  CPU
	</abt-checkbox-button>

	<abt-checkbox-button model.bind="myMemory" matcher.bind="productMatcher" checked.bind="selectedProductsMatcher">
	  Memory
	</abt-checkbox-button>
  </abt-button-group>
```
