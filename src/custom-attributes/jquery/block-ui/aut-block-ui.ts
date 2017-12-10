
import { noView, customAttribute, inject, bindable, bindingMode, DOM } from 'aurelia-framework';
import './scripts/jquery.blockUI.js';
import * as $ from 'jquery';
import './styles/spinKit.css';


enum Spinner {
  'bounce', 'doubleBounce', 'rectangle', 'cubeGrid', 'fadingCircle'
}


@noView()
@customAttribute('aut-block-ui')
@inject(Element)
export class BlockUI {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) private block: string | boolean = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) private css: any = null;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) private message: string = null;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) private spinnerType: Spinner = Spinner.bounce;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) private spinnerColor: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) private spinnerSize: string;

  private spinnerMsg: string = '';
  private isBound = false;

  constructor(private element: Element) {
  }

  private bind() {
    this.isBound = true;
  }

  private attached() {
    switch (this.spinnerType) {
      case Spinner.bounce:
        DOM.injectStyles(`.bounce {
  text-align: center;
}
.bounce > div {
  width: 12px;
  height: 12px;
  background-color: #92459B;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.bounce .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.bounce .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}`);
        this.spinnerMsg = '<div class="bounce"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';
        break;
      case Spinner.doubleBounce:

        break;
      case Spinner.rectangle:

        break;
      case Spinner.cubeGrid:

        break;
      case Spinner.fadingCircle:

        break;
    }
  }

  private blockChanged(doBlocking: boolean) {

    console.warn(`blocking: ${doBlocking}`);

    if (doBlocking) {
      $(this.element).block(
        {
          css: {
            border: 'none',
            backgroundColor: 'transparent'
          },
          message: this.message || this.spinnerMsg,
          overlayCSS: {
            backgroundColor: '#F7F7F7'
          },
          onBlock: () => console.log('blocked'),
          onUnblock: () => console.log('unblocked')
        }
      );
    } else {
      $(this.element).unblock();
    }
  }
}
