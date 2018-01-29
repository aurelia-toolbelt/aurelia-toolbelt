```html
<div class="row">
  <div class="col-sm-3">
    <abt-dropdown class="mb-2" value.bind="selected_Item_String" type="success" title="Choose your hardware">
      <abt-dropdown-item value="">
        Choose your hardware
      </abt-dropdown-item>
      <abt-dropdown-divider></abt-dropdown-divider>
      <abt-dropdown-item repeat.for="str of stringObjects" value.bind="str">
        ${str}
      </abt-dropdown-item>
    </abt-dropdown>
  </div>
  <div class="col-sm-3">
    <select value.bind="selected_Item_String" class="form-control">
      <option value="">
        Choose your hardware
      </option>
      <option repeat.for="str of stringObjects" value.bind="str">
        ${str}
      </option>
    </select>
  </div>
</div>

<abt-alert type="secondary" class="text-center">
  <span>
    Your selected items is: &nbsp;
    <b>${selected_Item_String}</b>
  </span>
</abt-alert>
```
