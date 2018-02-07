```css
.slow  .toggle-group { transition: left 0.8s;  -webkit-transition: left 0.8s; }
.fast  .toggle-group { transition: left 0.3s;  -webkit-transition: left 0.3s; }
.quick .toggle-group { transition: none;       -webkit-transition: none; }
```
```html
<abt-toggle checked css="slow">
</abt-toggle>

<abt-toggle checked css="fast">
</abt-toggle>

<abt-toggle checked css="quick">
</abt-toggle>
```
