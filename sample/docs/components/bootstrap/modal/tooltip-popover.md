```html
<abt-button id="showModalTooltip">
  Launch demo Modal
</abt-button>

<!-- Modal -->
<abt-modal open-by="showModalTooltip">
  <abt-modal-header>
    <abt-modal-title class="modal-title-aurelia">
      <h5>Aurelia Toolbelt Dialog</h5>
    </abt-modal-title>
  </abt-modal-header>
  <abt-modal-body>
    <h5>Popover in a modal</h5>
    <p>This
      <a href="#/bootstrap/modal" role="button" class="btn btn-secondary popover-test" title="Popover title" data-content="Popover body content is set in this attribute.">button
        <abt-popover title="Popover title" placement='right'>
          And here's some amazing content. It's very engaging. Right?
        </abt-popover>
      </a> triggers a popover on click.</p>
    <hr>
    <h5>Tooltips in a modal</h5>
    <p>
      <a href="#/bootstrap/modal" class="tooltip-test" title="Tooltip">This link
        <abt-tooltip placement='bottom'>
          Tooltip on right
        </abt-tooltip>
      </a> and
      <a href="#/bootstrap/modal" class="tooltip-test" title="Tooltip">that link
        <abt-tooltip placement='top'>
          Tooltip on right
        </abt-tooltip>
      </a> have tooltips on hover.</p>
    </div>
  </abt-modal-body>
  <abt-modal-footer>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    <button type="button" class="btn btn-primary">Save changes</button>
  </abt-modal-footer>
</abt-modal>
```
