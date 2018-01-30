```html
<abt-dropdown class="mb-2" value.bind="selectedFramework" align-right split title="Choose your framework"     click.call="loadFrameworks(event,target)"
  changed.call="selectedChanged(selected)">
  <abt-dropdown-item value="">
    Choose your framework
  </abt-dropdown-item>
  <abt-dropdown-divider></abt-dropdown-divider>
  <abt-dropdown-item repeat.for="framework of frameworks" value.bind="framework">
    ${framework}
  </abt-dropdown-item>
</abt-dropdown>

<abt-alert type="secondary" class="text-center">
  <span>
    Your selected framework is: <b>${selectedFramework}</b>
  </span>
</abt-alert>

```
