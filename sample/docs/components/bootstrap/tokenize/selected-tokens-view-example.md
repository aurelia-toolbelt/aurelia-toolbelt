```html
<abt-inputgroup class="mb-2">
  <input ref='addInput' type="text" class="form-control" placeholder="Add token" aria-label="Add token">
  <abt-inputgroup-append>
    <abt-button color="secondary" click.call="onAdd(addInput.value)">
      Add
    </abt-button>
  </abt-inputgroup-append>
</abt-inputgroup>
<abt-inputgroup class="mb-2">
  <input ref='removeInput' type="text" class="form-control" 
      placeholder="Remove specific token" aria-label="Remove specific token">
  <abt-inputgroup-append>
    <abt-button color="secondary" click.call="onRemove(removeInput.value)">
      Remove
    </abt-button>
    <abt-button color="secondary" click.call="onRemoveAll()">
      Remove All
    </abt-button>
  </abt-inputgroup-append>
</abt-inputgroup>

<abt-tokenize selected-tokens.bind="tokens" data-source.call='fill(term)'></abt-tokenize>
```
