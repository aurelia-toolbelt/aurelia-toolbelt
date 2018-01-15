import { DOM, containerless, inject } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';

@inject(Element)
@containerless()
@customElement('abt-navbar')
export class BootstrapNavBar {
    constructor() {
        DOM.injectStyles(`
        .navbar-megamenu .nav,
        .navbar-megamenu .collapse,
        .navbar-megamenu .dropup,
        .navbar-megamenu .dropdown {
            position: static;
        }

        .navbar-megamenu .container {
            position: relative;
        }

        .navbar-megamenu .dropdown-menu {
            left: auto;
        }

        .navbar-megamenu .navbar-megamenu-content {
            padding: 20px 30px;
        }

        .navbar-megamenu .dropdown.navbar-megamenu-fullwidth .dropdown-menu {
            left: 0;
            right: 0;
        }`);

    }
}
