```html
<abt-dropdown class="mb-2" value.bind="likesTacos" type="info" title="like your tacos">
  <abt-dropdown-item model.bind="null">
    Do you like tacos
  </abt-dropdown-item>
  <abt-dropdown-divider></abt-dropdown-divider>
  <abt-dropdown-item model.bind="true">
    Yes
  </abt-dropdown-item>
  <abt-dropdown-item model.bind="false">
    No
  </abt-dropdown-item>
</abt-dropdown>

<abt-alert type="secondary" class="text-center">
  <span>
    Likes Tacos: &nbsp; ${likesTacos}
  </span>
</abt-alert>

```
