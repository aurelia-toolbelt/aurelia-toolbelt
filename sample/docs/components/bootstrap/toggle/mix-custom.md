Mix types:

```html
<abt-toggle checked on-type="success" off-type="danger"></abt-toggle>
<abt-toggle checked on-type="warning" off-type="info"></abt-toggle>
```

Use ```css``` attribute, to make your own shapes for toggle.

```iOS``` like style: 

```css
.toggle.ios,
  .toggle-on.ios,
  .toggle-off.ios {
    border-radius: 20px;
  }

  .toggle.ios .toggle-handle {
    border-radius: 20px;
  }
```
```html
<abt-toggle checked css="ios"></abt-toggle>
```

and ```android``` like style:

```css
.toggle.android {
  border-radius: 0px;
}

.toggle.android .toggle-handle {
  border-radius: 0px;
}
```
```html
<abt-toggle checked on-type="info" css="android"></abt-toggle>
```


or create your own toggle types by creating a new css class of ```btn-*``` and assign it to either ```on-type``` or ```off-type```:

```css
.btn-aurelia {
  color: white;
  background-color: #753B85;
}

.btn-toolbelt {
  color: gold;
  background-color: maroon;
}
```
```html
 <abt-toggle checked on-type="toolbelt" off-type="aurelia"></abt-toggle>
```
        
        