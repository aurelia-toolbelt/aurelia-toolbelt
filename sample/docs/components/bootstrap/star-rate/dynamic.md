```html
<abt-star-rate max-rate="7" rate.bind="myRate" disabled.bind="beDisable">
  <span class="fa fa-minus-circle" style="cursor:pointer; color:maroon" click.trigger="myRate=0"></span>
</abt-star-rate>

<abt-toggle size="small" class="float-right" on="Disable" off="Enable" on-type="secondary" off-type="success" checked.bind="beDisable">
</abt-toggle>
```
