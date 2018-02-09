```html
<div class="row">
  <div class="col-sm-2">
    <abt-navs id="navbar-example3" class="navbar-light bg-light">
      <abt-navbar-brand href="#">Navbar</abt-navbar-brand>
      <abt-navs pills class="flex-column">
        <abt-navbar-link href="#item-1">Item 1</abt-navbar-link>
        <abt-navs pills class="flex-column">
          <abt-navbar-link class="ml-3 my-1" href="#item-1-1">Item 1-1</abt-navbar-link>
          <abt-navbar-link class="ml-3 my-1" href="#item-1-2">Item 1-2</abt-navbar-link>
        </abt-navs>
        <abt-navbar-link href="#item-2">Item2</abt-navbar-link>
        <abt-navbar-link class="nav-link" href="#item-3">Item3</abt-navbar-link>
        <abt-navs pills class="flex-column">
          <abt-navbar-link class="ml-3 my-1" href="#item-3-1">Item 3-1</abt-navbar-link>
          <abt-navbar-link class="ml-3 my-1" href="#item-3-2">Item 3-2</abt-navbar-link>
        </abt-navs>
      </abt-navs>
    </abt-navs>
  </div>
  <div class="col-sm-10">
    <abt-scrollspy class="scrollable" target="navbar-example3">
      <abt-scrollspy-item id="item-1">
        <h4>Item 1</h4>
        <p>
          ...
        </p>
      </abt-scrollspy-item>
      <abt-scrollspy-item id="item-1-1">
        <h5>Item 1-1</h5>
        <p>
          ...
        </p>
      </abt-scrollspy-item>
      <abt-scrollspy-item id="item-1-2">
        <h5>Item 2-2</h5>
        <p>
          ...
        </p>
      </abt-scrollspy-item>
      <abt-scrollspy-item id="item-2">
        <h4>Item 2</h4>
        <p>
          ...
        </p>
      </abt-scrollspy-item>
      <abt-scrollspy-item id="item-3">
        <h4>Item 3</h4>
        <p>
          ...
        </p>
      </abt-scrollspy-item>
      <abt-scrollspy-item id="item-3-1">
        <h5>Item 3-1</h5>
        <p>
          ...
        </p>
      </abt-scrollspy-item>
      <abt-scrollspy-item id="item-3-2">
        <h5>Item 3-2</h5>
        <p>
          ...
        </p>
      </abt-scrollspy-item>
    </abt-scrollspy>
  </div>
</div>
```