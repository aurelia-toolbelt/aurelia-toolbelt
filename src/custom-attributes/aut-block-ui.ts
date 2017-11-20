
import { noView, customAttribute, inject, bindable, bindingMode } from 'aurelia-framework';

@noView()
@customAttribute('aut-block-ui')
@inject(Element)
export class BlockUI {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) private block: boolean | string = false;

  private blocker: HTMLDivElement;

  constructor(private element: Element) {
    this.blocker = document.createElement('div');
  }

  private attached() {
    // this.blocker.innerText = 'I am blocking you';
    // The calculations must be done before appendChild(this.blocker)
    const left = this.element.getBoundingClientRect().left;
    const top = this.element.getBoundingClientRect().top;
    const width = this.element.getBoundingClientRect().width;
    const height = this.element.getBoundingClientRect().height;
    this.blocker.classList.add('overlay', 'overlay02');
    this.element.appendChild(this.blocker);

    const overlayStyle = `
        .overlay01 {
          position: fixed;
          top: ${top}px;
          left: ${left}px;
          z-index: 999999;
          width: ${width}px;
          height: ${height}px;
          background: rgba(0, 0, 0, .7);
          opacity: 0;
          visibility: hidden;
          transition: .3s linear;
        }
        .overlay01.is-open {
          opacity: 1;
          visibility: visible;
        }

        .overlay02 {
          position: fixed;
          top: ${top}px;
          left: ${left}px;
          z-index: 999999;
          width: ${width}px;
          height: ${height}px;
          background: rgba(0, 0, 0, .7);
          opacity: 0;
          visibility: hidden;
          transition: .3s linear;
          transform: scale(.2);
        }
        .overlay02.is-open {
          opacity: 1;
          visibility: visible;
          transform: scale(1);
        }

        .overlay03 {
          position: fixed;
          top: ${top}px;
          left: ${left}px;
          z-index: 999999;
          width: ${width}px;
          height: ${height}px;
          background: rgba(0, 0, 0, .7);
          opacity: 0;
          visibility: hidden;
          transition: .3s linear;
          transform: scaleY(0);
        }
        .overlay03.is-open {
          opacity: 1;
          visibility: visible;
          transform: scaleY(1);
        }

        .overlay04 {
          position: fixed;
          top: ${top}px;
          left: ${left}px;
          z-index: 999999;
          width: ${width}px;
          height: ${height}px;
          background: rgba(0, 0, 0, .7);
          opacity: 0;
          visibility: hidden;
          transition: .3s linear;
          transform: translateY(-100%);
        }
        .overlay04.is-open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .overlay05 {
          position: fixed;
          top: ${top}px;
          left: ${left}px;
          z-index: 999999;
          width: ${width}px;
          height: ${height}px;
          background: rgba(0, 0, 0, .7);
          opacity: 0;
          visibility: hidden;
          transition: .3s linear;
          transform: translateX(-100%);
        }
        .overlay05.is-open {
          opacity: 1;
          visibility: visible;
          transform: translateX(0);
        }

        .overlay06 {
          position: fixed;
          top: ${top}px;
          left: ${left}px;
          z-index: 999999;
          width: ${width}px;
          height: ${height}px;
          background: rgba(0, 0, 0, .7);
          opacity: 0;
          visibility: hidden;
          transition: .3s linear;
          animation: .3s linear overlay06-close;
        }
        .overlay06.is-open {
          opacity: 1;
          visibility: visible;
          animation: .3s linear overlay06-open;
        }
        @keyframes overlay06-open {
          0% {
            transform: scaleY(0);
            transform-origin: top;
          }
          100% {
            transform: scaleY(1);
            transform-origin: top;
          }
        }
        @keyframes overlay06-close {
          0% {
            transform: scaleY(1);
            transform-origin: bottom;
          }
          100% {
            transform: scaleY(0);
            transform-origin: bottom;
          }
        }

        .overlay07 {
          position: fixed;
          top: ${top}px;
          left: ${left}px;
          z-index: 999999;
          width: ${width}px;
          height: ${height}px;
          background: rgba(0, 0, 0, .7);
          opacity: 0;
          visibility: hidden;
          transition: .3s linear;
          animation: .3s linear overlay07-close;
        }
        .overlay07.is-open {
          opacity: 1;
          visibility: visible;
          animation: .3s linear overlay07-open;
        }
        @keyframes overlay07-open {
          0% {
            transform: scaleX(0);
            transform-origin: left;
          }
          100% {
            transform: scaleX(1);
            transform-origin: left;
          }
        }
        @keyframes overlay07-close {
          0% {
            transform: scaleX(1);
            transform-origin: right;
          }
          100% {
            transform: scaleX(0);
            transform-origin: right;
          }
        }

        .overlay08,
        .overlay08::before,
        .overlay08::after {
          position: fixed;
          top: ${top}px;
          left: ${left}px;
          z-index: 999999;
          width: ${width}px;
          height: ${height}px;
          transition: .3s linear;
        }
        .overlay08 {
          opacity: 0;
          visibility: hidden;
        }
        .overlay08::before,
        .overlay08::after {
          content: '';
          background: rgba(0, 0, 0, .45);
        }
        .overlay08::before {
          transform: translateY(-100%);
        }
        .overlay08::after {
          transform: translateY(100%);
        }
        .overlay08.is-open {
          opacity: 1;
          visibility: visible;
        }
        .overlay08.is-open::before,
        .overlay08.is-open::after {
          transform: translateY(0);
        }`;

    const style = document.createElement('style');
    style.textContent = overlayStyle;
    document.head.appendChild(style);



    /*this.blocker.style.cssText = `position: fixed;display: none;width: ${width}px;height: ${height}px;top: ${top}px;left: ${left}px;
    background-color: rgba(0, 0, 0, 0.5);z-index: 9999999;cursor: pointer;`;*/
  }


  private blockChanged(doBlocking: boolean) {

    console.log(`do blocking: ${doBlocking}`);

    if (doBlocking) {
      /*this.blocker.style.display = 'block';*/
      this.blocker.classList.add('overlay', 'overlay02', 'is-open');
      // this.element.appendChild(this.blocker);
      return;
    }

    if (this.blocker.parentElement === this.element) {
      this.blocker.classList.remove('is-open');

      /*this.blocker.style.display = 'none';*/
      // this.element.removeChild(this.blocker);
    }

  }

}
