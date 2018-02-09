```html
<nav id="navbar-example2" class="navbar navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <ul class="nav nav-pills">
    <li class="nav-item">
      <a class="nav-link" href="#fatnav">@fat</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#mdonav">@mdo</a>
    </li>
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#onenav">one</a>
        <a class="dropdown-item" href="#twonav">two</a>
        <div role="separator" class="dropdown-divider"></div>
        <a class="dropdown-item" href="#threenav">three</a>
      </div>
    </li>
  </ul>
</nav>
<abt-scrollspy class="scrollable" target="#navbar-example2">
  <abt-scrollspy-item id="fatnav">
    <h4>@fat</h4>
    <p>
      ...
    </p>
  </abt-scrollspy-item>
  <abt-scrollspy-item id="mdonav">
    <h4>@mdo</h4>
    <p>
      ...
    </p>
  </abt-scrollspy-item>
  <abt-scrollspy-item id="onenav">
    <h4>one</h4>
    <p>
      ...
    </p>
  </abt-scrollspy-item>
  <abt-scrollspy-item id="twonav">
    <h4>two</h4>
    <p>
      ...
    </p>
  </abt-scrollspy-item>
  <abt-scrollspy-item id="threenav">
    <h4>three</h4>
    <p>
      ...
    </p>
  </abt-scrollspy-item>
</abt-scrollspy>
```