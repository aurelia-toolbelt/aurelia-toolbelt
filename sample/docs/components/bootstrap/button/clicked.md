```html
<abt-button class="mr-2" click.call="onClick()">Click me</abt-button>

<abt-button click.call="onClick()">
  Click me with loading indicator
  
  <span slot="loading">
    <i class="fa fa-spinner fa-spin" aria-hidden="true">
    </i>
  </span>
</abt-button>

<abt-button class="float-right" click.call="onClickWithoutPromise()">
  Click me, no promise returns
</abt-button>
```