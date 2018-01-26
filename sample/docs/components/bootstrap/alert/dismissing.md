It is possible to dismiss any alert inline, just simply add ```dismissible``` attribute to the ```alert``` element. You can disable animation by turning off the ```animate``` attribute. **e.g.** ```animate=false```. The default values for ```dismissible``` and ```animate``` are ```false``` and ```true``` respectively.

```html
  <abt-alert type="warning" dismissible.bind="showDismissible" animate>
    <strong>Holy guacamole!</strong> You should check in on some of those fields below.
  </abt-alert>
  <abt-alert type="success" dismissible animate>
    <strong>Awesome!</strong> Your data saved successfully.
  </abt-alert>
```
