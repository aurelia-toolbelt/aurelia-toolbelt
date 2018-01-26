
To set up a `caption`, you need to use a html control like `div` and add a `slot="caption"` attribute on it.
```html
<abt-carousel navigator="true" indicator="true">
  <abt-carousel-item>
    <img class="d-block w-100" src="/images/pic1.jpg" alt="The image cannot be displayed" />
    <div slot="caption">
      <h5>The Godfather - 1972</h5>
      <p>Director: Francis Ford Coppola</p>
    </div>
  </abt-carousel-item>
  <abt-carousel-item>
    <img class="d-block w-100" src="/images/pic2.jpg" alt="The image cannot be displayed" />
    <div slot="caption">
      <h5>The Dark Knight - 2008</h5>
      <p>Director: Christopher Nolan</p>
    </div>
  </abt-carousel-item>
  <abt-carousel-item active="true">
    <img class="d-block w-100" src="/images/pic3.jpg" alt="The image cannot be displayed" />
    <div slot="caption">
      <h5>Inception - 2010</h5>
      <p>Director: Christopher Nolan</p>
    </div>
  </abt-carousel-item>
  <abt-carousel-item>
    <img class="d-block w-100" src="/images/pic4.jpg" alt="The image cannot be displayed" />
    <div slot="caption">
      <h5>The Lord of the Rings: The Return of the King - 2003</h5>
      <p>Director: Peter Jackson</p>
    </div>
  </abt-carousel-item>
  <abt-carousel-item>
    <img class="d-block w-100" src="/images/pic5.jpg" alt="The image cannot be displayed" />
    <div slot="caption">
      <h5>The Matrix - 1999</h5>
      <p>Directors: Lana Wachowski, Lilly Wachowski</p>
    </div>
  </abt-carousel-item>
</abt-carousel>
```