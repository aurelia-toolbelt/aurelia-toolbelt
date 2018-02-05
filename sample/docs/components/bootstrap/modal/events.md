```html
<abt-button id="eventsModal">
  Launch demo modal
</abt-button>

<!-- Modal -->
<abt-modal open-by="eventsModal" bs-show.call="showEvent()" bs-hide.call="hideEvent()">
  <abt-modal-header>
    <abt-modal-title class="modal-title-aurelia">
      <h5>Aurelia Toolbelt Dialog</h5>
    </abt-modal-title>
  </abt-modal-header>
  <abt-modal-body>
    <div class="container">
      Check Browser
      <b>console</b>
    </div>
  </abt-modal-body>
</abt-modal>
```
