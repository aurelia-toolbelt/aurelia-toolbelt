```html
<p>
    <abt-button id="btnFirst">
    First element
    </abt-button>
    <abt-button id="btnSecond">
    Toggle second element
    </abt-button>
    <button class="btn btn-primary" type="button" ref="btnBoth">
    Toggle All elements
    </button>
</p>
<div class="row">
    <div class="col">
    <abt-collapse controlled-by.bind="['btnFirst',btnBoth]">
        <div class="card card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 
        <p>Nihil anim keffiyeh helvetica,
        craft beer labore wes anderson cred nesciunt sapiente ea proident.</p>
        </div>
    </abt-collapse>
    </div>
    <div class="col">
    <abt-collapse controlled-by.bind="['btnSecond',btnBoth]">
        <div class="card card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica,
        craft beer labore wes anderson cred nesciunt sapiente ea proident.
        </div>
    </abt-collapse>
    </div>
    <div class="col">
    <abt-collapse controlled-by.bind="btnBoth">
        <div class="card card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica,
        craft beer labore wes anderson cred nesciunt sapiente ea proident.
        </div>
    </abt-collapse>
    </div>
</div>
```