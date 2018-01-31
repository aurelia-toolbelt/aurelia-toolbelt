Use bootstrap contextual types: 

```html
<abt-star-rate></abt-star-rate>
<abt-star-rate type="secondary"></abt-star-rate>
<abt-star-rate type="info"></abt-star-rate>
<abt-star-rate type="success"></abt-star-rate>
```


Your custom ```star-*``` type: 

```css
.star-aurelia {
  color: #753B85;
}
```
```html
<abt-star-rate type="aurelia"></abt-star-rate>
```


and just simply put a value into ```color``` property

```html
<abt-star-rate color="maroon"></abt-star-rate>
```
