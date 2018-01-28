```html
<abt-navbar expand-size="lg" navbar-color-type="light" background-color-type="light">
  <abt-navbar-brand>NavBar</abt-navbar-brand>
  <abt-navbar-toggler></abt-navbar-toggler>
  <abt-navbar-collapser>
    <abt-navbar-nav class="mr-auto">
      <abt-navbar-link active="true" href="#">Home</abt-navbar-link>
      <abt-navbar-link href="#">Link</abt-navbar-link>
      <abt-navbar-dropdown title="DropDown">
        <abt-navbar-dropdown-item>Action</abt-navbar-dropdown-item>
        <abt-navbar-dropdown-item>Another action</abt-navbar-dropdown-item>
        <abt-navbar-dropdown-divider></abt-navbar-dropdown-divider>
        <abt-navbar-dropdown-item>Something else here</abt-navbar-dropdown-item>
      </abt-navbar-dropdown>
      <abt-navbar-link disabled="true">Disabled</abt-navbar-link>
    </abt-navbar-nav>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <abt-button outline bs-type="success" type="submit" class="my-2 my-sm-0">
        Button
      </abt-button>
    </form>
  </abt-navbar-collapser>
</abt-navbar>
```
