```html
<aut-checkbox curve fill animation="smooth" color="success" checked.bind="showModal"> 
  Show Modal
</aut-checkbox>

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
      <aut-checkbox curve fill animation="smooth" color="success" checked.bind="showModal"> Show Modal
      </aut-checkbox>
    </div>
  </abt-modal-body>
</abt-modal>
```
