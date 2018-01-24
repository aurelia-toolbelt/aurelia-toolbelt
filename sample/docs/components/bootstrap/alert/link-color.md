
You can either go [bootstrap way](http://getbootstrap.com/docs/4.0/components/alerts/#link-color), or aurelia way

```html
<abt-alert>
  <strong>Hello there!</strong> I am the default alert with a
  <abt-alert-link href="https://github.com/shahabganji/aurelia-toolbelt/tree/master/src/components/bootstrap/alert">great link</abt-alert-link>to alert repository.
</abt-alert>

<abt-alert type="success">
  <strong>Well done!</strong> This is a success alert for you with a
  <abt-alert-link href="https://github.com/shahabganji/aurelia-toolbelt/tree/master/src/components/bootstrap/alert">great link</abt-alert-link>to alert repository..
</abt-alert>

<abt-alert type="secondary">
  <strong>Take care!</strong> This is a secondary alert which need your attention and with a
  <abt-alert-link href="https://github.com/shahabganji/aurelia-toolbelt/tree/master/src/components/bootstrap/alert">great link</abt-alert-link>to alert repository.
</abt-alert>

<abt-alert type="warning">
  <strong>Attention!</strong> Wanna show a warning, use this one with a
  <abt-alert-link href="https://github.com/shahabganji/aurelia-toolbelt/tree/master/src/components/bootstrap/alert">great link</abt-alert-link>to alert repository.
</abt-alert>

<abt-alert type="danger">
  <strong>Oh no!</strong> Something is going wrong with a
  <abt-alert-link href="https://github.com/shahabganji/aurelia-toolbelt/tree/master/src/components/bootstrap/alert">great link</abt-alert-link>to alert repository.
</abt-alert>
```