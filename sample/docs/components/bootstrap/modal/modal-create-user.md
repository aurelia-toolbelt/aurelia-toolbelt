```html
<abt-modal centered="true">
  <abt-modal-header>
    <abt-modal-title>
      User Information
    </abt-modal-title>
  </abt-modal-header>

  <abt-modal-body>

    <abt-inputgroup class="mb-3">
      <input attach-focus type="text" class="form-control" placeholder="Your name goes here" aria-label="FirstName" value.bind="developer.firstName">
    </abt-inputgroup>

    <abt-inputgroup class="mb-3">
      <input type="text" class="form-control" placeholder="Recipient's username" aria-label="LastName" value.bind="developer.lastName">
    </abt-inputgroup>

  </abt-modal-body>

  <abt-modal-footer>
    <div class="pull-right">
      <abt-button bs-type="success" click.call="okHandler()">Save Changes</abt-button>
      <abt-button bs-type="warning" click.call="cancelHandler()">Discard</abt-button>
    </div>
  </abt-modal-footer>

</abt-modal>
```
