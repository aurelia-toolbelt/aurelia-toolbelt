```html
<abt-button id="showModal">
  Launch demo modal
</abt-button>

<!-- Modal -->
<abt-modal open-by="showModal">
  <abt-modal-header>
    <abt-modal-title class="modal-title-aurelia">
      <h5>Aurelia Toolbelt Dialog</h5>
    </abt-modal-title>
  </abt-modal-header>
  <abt-modal-body>
    <div>
      Hooray, you see a message in a dialog.
    </div>
  </abt-modal-body>
  <abt-modal-footer>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    <button type="button" class="btn btn-primary">Save changes</button>
  </abt-modal-footer>
</abt-modal>
```
