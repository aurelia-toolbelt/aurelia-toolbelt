
Contextual variations are: ```primary```, ```secondary```, ```info```, ```success```, ```warning```, ```danger```,  ```light```, ```dark```, use one of them as a value for the ```type``` attribute.

```html
<abt-alert>
  <strong>Hello there!</strong> I am the default alert.
</abt-alert>

<abt-alert type="success">
  <strong>Well done!</strong> This is a success alert for you.
</abt-alert>

<abt-alert type="info" countdown="10" countdown-changed.call="countDownHasChanged(current)" show-alert.bind="show_countdown_alert">
  This alert will be disappeared after <strong>${secondsRemained}</strong> seconds...
</abt-alert>

<abt-button click.call="showAlert()">
  Click here to show an alert with countdown
</abt-button>

```
