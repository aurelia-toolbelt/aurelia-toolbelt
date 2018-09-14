```html
<abt-button id="btnPersonModal" click.call="openModal()">
  Add New Developer
</abt-button>

<ul class="list-group col-sm-5">
  <li class="list-group-item" repeat.for="dev of developers">
    <span>
      ${dev.firstName} - ${dev.lastName}
    </span>
    <button class="pull-right" click.delegate="deleteDeveloper(dev)">
      Remove
    </button>
  </li>
</ul>
```
