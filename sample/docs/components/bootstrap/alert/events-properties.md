
```html
<abt-button color="secondary" click.call="toggleAlert()">
  Show/Hide alerts
</abt-button>

<abt-alert type="secondary" show-alert.bind="show_hide" bs-show.call="onShow(target)">
  This is an animated secondary alert which resolves its onShow promise to false:
</abt-alert>

<abt-alert type="primary" animate="false" show-alert.bind="show_hide">
  This is a non-animated primary alert.
</abt-alert>
```