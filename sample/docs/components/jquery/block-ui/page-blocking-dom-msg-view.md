```html
<div id="domMessage" style="display:none;background-color: black">
  <h1 style="color:white;font-size: 15px;padding:0;margin:0">We are processing your request. Please be patient.</h1>
</div>
<button type="button" class="btn btn-primary" click.delegate="blockThePageDomMsg()">Page block</button>
<aut-block-ui block-page.bind="blockPageDomMsg" settings.bind="blockPageDomMsgOption"></aut-block-ui>
```