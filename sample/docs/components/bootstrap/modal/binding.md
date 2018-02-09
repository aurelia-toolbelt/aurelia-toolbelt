```html
<abt-toggle on="Shown" off="Hidden" on-type="success" checked.bind="showModal">
</abt-toggle>

<!-- Modal -->
<abt-modal bs-show.call="showEvent()" bs-hide.call="hideEvent()" visible.bind="showModal">
  <abt-modal-header>
    <abt-modal-title>
      <h5 style="color:maroon">Aurelia Toolbelt Dialog</h5>
    </abt-modal-title>
  </abt-modal-header>
  <abt-modal-body>
    <div class="container">
      Modal shown by a checkbox value changed
      <br />
        <abt-toggle on="Shown" off="Hidden" on-type="success" checked.bind="showModal">
        </abt-toggle>
    </div>
  </abt-modal-body>
</abt-modal>
```
