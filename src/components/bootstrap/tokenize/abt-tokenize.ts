import { customElement, inject, bindable, bindingMode, BindingEngine } from 'aurelia-framework';

import * as $ from 'jquery';
import './scripts/tokenize2';
import './styles/tokenize2.css';

@inject(Element)
@customElement('abt-tokenize')
export class BootstrapTokenizeCustomElement { }
