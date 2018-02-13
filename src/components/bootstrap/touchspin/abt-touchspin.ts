import { customElement, inject, bindable, bindingMode, BindingEngine } from 'aurelia-framework';

import * as $ from 'jquery';
import './scripts/jquery.bootstrap-touchspin';
// import './styles/jquery.bootstrap-touchspin.css';

@inject(Element)
@customElement('abt-touchspin')
export class BootstrapTouchspinCustomElement { }
