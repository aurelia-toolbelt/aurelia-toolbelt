```html
<div class="container" ref="test">
  <table class="table table-striped">
    <thead class="table-secondary">
      <tr>
        <td>#</td>
        <td>First Name</td>
        <td>Last Name</td>
        <td>
          <abt-button size="sm" click.call="loadDevelopers()" class="float-right">
                Refresh
          </abt-button>
        </td>
      </tr>
    </thead>
    <tbody class="table-dark">
      <tr repeat.for="dev of developers">
        <td>${dev.id}</td>
        <td>${dev.firstName}</td>
        <td>${dev.lastName}</td>
        <td></td>
      </tr>
    </tbody>
  </table>
</div>

<at-nanobar type="info" increment.bind="10" loading.bind="isLoading" parent.bind="test" class="custom-nanobar">
</at-nanobar>

```
