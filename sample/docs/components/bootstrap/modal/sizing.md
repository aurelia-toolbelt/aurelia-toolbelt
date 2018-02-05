```html
<abt-button id="Modal">
  Large modal
</abt-button>
<abt-button id="showSmallModal">
  Small modal
</abt-button>


<!-- Large Modal -->
<abt-modal open-by="showLargeModal" size="lg">
  <abt-modal-header>
    <abt-modal-title class="modal-title-aurelia">
      <h5>Aurelia Toolbelt Dialog</h5>
    </abt-modal-title>
  </abt-modal-header>
  <abt-modal-body>

    <div>
      Large Modal
    </div>

  </abt-modal-body>
  <abt-modal-footer>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
  </abt-modal-footer>
</abt-modal>


<!-- Small Modal -->
<abt-modal open-by="showSmallModal" size="sm">
  <abt-modal-header>
    <abt-modal-title class="modal-title-aurelia">
      <h5>Aurelia Toolbelt Dialog</h5>
    </abt-modal-title>
  </abt-modal-header>
  <abt-modal-body>

    <div>
      Small Modal
    </div>

  </abt-modal-body>
  <abt-modal-footer>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
  </abt-modal-footer>
</abt-modal>
```
