```html
<abt-inputgroup class="mb-3">
  <abt-inputgroup-prepend>
    <abt-inputgroup-text>@</abt-inputgroup-text>
  </abt-inputgroup-prepend>
  <input type="text" class="form-control" placeholder="Username" aria-label="Username">
</abt-inputgroup>
<abt-inputgroup class="mb-3">
  <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username">
  <abt-inputgroup-append>
    <abt-inputgroup-text>@example.com</abt-inputgroup-text>
  </abt-inputgroup-append>
</abt-inputgroup>
<label for="basic-url">Your vanity URL</label>
<abt-inputgroup class="mb-3">
  <abt-inputgroup-append>
    <abt-inputgroup-text>https://example.com/users/</abt-inputgroup-text>
  </abt-inputgroup-append>
  <input type="text" class="form-control" id="basic-url">
</abt-inputgroup>
<abt-inputgroup id="inputgroup" class="mb-3">
  <abt-inputgroup-prepend id="inputgroup-prepend">
    <abt-inputgroup-text id="inputgroup-text1">$</abt-inputgroup-text>
  </abt-inputgroup-prepend>
  <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
  <abt-inputgroup-append id="inputgroup-append">
    <abt-inputgroup-text id="inputgroup-text2">.00</abt-inputgroup-text>
  </abt-inputgroup-append>
</abt-inputgroup>
<abt-inputgroup class="mb-3">
  <abt-inputgroup-prepend>
    <abt-inputgroup-text style="height:62px">With textarea</abt-inputgroup-text>
  </abt-inputgroup-prepend>
  <textarea class="form-control" aria-label="With textarea"></textarea>
</abt-inputgroup>
```