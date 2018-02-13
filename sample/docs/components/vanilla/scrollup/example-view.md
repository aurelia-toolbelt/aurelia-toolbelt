```html
<style>
    .aut-scrollup {
        background: url('/images/top.png') no-repeat;
        cursor: pointer;
        border: none;
        border-radius: 0;
        width: 64px;
        height: 64px;
    }
</style>

<abt-inputgroup class="mb-3">
    <abt-inputgroup-prepend>
        <abt-inputgroup-text>Threshold</abt-inputgroup-text>
    </abt-inputgroup-prepend>
    <input type="number" value.bind="thresholdValue" min='0' max='1800' class="form-control" 
           placeholder="Threshold" aria-label="Threshold">
</abt-inputgroup>
<aut-scrollup threshold.bind="thresholdValue" before-scroll-up.call="onBeforeScrollUp()" 
              after-scroll-up.call="onAfterScrollup()">
</aut-scrollup>
```