```html
<abt-star-rate max-rate="7" rate.bind="myRate" disabled.bind="beDisable">
  <span class="fa fa-minus-circle" style="cursor:pointer; color:maroon" click.trigger="myRate=0"></span>
</abt-star-rate>

<aut-checkbox curve color="danger" class="float-right" checked.bind="beDisable">
  Disable
</aut-checkbox>
```
