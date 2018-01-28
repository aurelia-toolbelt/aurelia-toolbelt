```html
 <p>
  <a class="btn btn-link" type="button" ref="mylink">
    Link
  </a>
  <abt-button class="btn btn-primary" type="button" id="myBtn2">
    abt-button
  </abt-button>
  <button class="btn btn-primary" type="button" ref="myBtn">
    Button
  </button>
</p>

<abt-collapse controlled-by.bind="[myBtn,'myBtn2', mylink]" bs-show.call="showCollapse()" bs-hide.call="hideCollapse()">
  <div class="card card-body">
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica,
    craft beer labore wes anderson cred nesciunt sapiente ea proident.
  </div>
</abt-collapse>
```
