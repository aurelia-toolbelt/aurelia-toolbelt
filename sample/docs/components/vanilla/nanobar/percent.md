```html
  <div class="container" ref="test2">
    <abt-alert type="info" class="mt-5">
      Change the value of range below to see how it'll affect the <b>nanobar</b> progress.
    </abt-alert>

    <label style="width:100%">
      Value: ${percentage}
      <input style="width:100%;" type="range" min="0" max="100" value.bind="percentage" />
    </label>

  </div>

  <at-nanobar percent.bind="percentage" shadow central parent.bind="test2">
  </at-nanobar>

```
