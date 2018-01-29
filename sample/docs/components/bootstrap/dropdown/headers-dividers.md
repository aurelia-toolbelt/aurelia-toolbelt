```html
<abt-dropdown title="Dropdown with header">
  <abt-dropdown-header>Important Actions</abt-dropdown-header>
  <abt-dropdown-item>Action</abt-dropdown-item>
  <abt-dropdown-item>Something else here</abt-dropdown-item>
</abt-dropdown>

<abt-dropdown type="warning" title="Dropdown Divider">
  <abt-dropdown-item>Action</abt-dropdown-item>
  <abt-dropdown-item>Another action</abt-dropdown-item>
  <abt-dropdown-item>Something else here</abt-dropdown-item>
  <abt-dropdown-divider></abt-dropdown-divider>
  <abt-dropdown-item>Separated link</abt-dropdown-item>
</abt-dropdown>


<abt-dropdown type="secondary" title="Dropdown Form" class="ml-5" align-right>
    <form class="px-4 py-3">
      <div class="form-group">
        <label for="exampleDropdownFormEmail1">Email address</label>
        <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com">
      </div>
      <div class="form-group">
        <label for="exampleDropdownFormPassword1">Password</label>
        <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Password">
      </div>
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="dropdownCheck">
        <label class="form-check-label" for="dropdownCheck">
          Remember me
        </label>
      </div>
      <button type="submit" class="btn btn-primary">Sign in</button>
    </form>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">New around here? Sign up</a>
    <a class="dropdown-item" href="#">Forgot password?</a>
</abt-dropdown>

```
