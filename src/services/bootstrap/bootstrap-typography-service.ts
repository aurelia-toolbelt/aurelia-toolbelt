import { singleton, noView } from 'aurelia-framework';

@singleton()
export class BootstrapTypographyService {

  public blue: string;
  public cyan: string;
  public danger: string;
  public dark: string;
  public gray: string;
  public grayDark: string;
  public green: string;
  public indigo: string;
  public info: string;
  public light: string;
  public muted: string;
  public orange: string;
  public pink: string;
  public primary: string;
  public purple: string;
  public red: string;
  public secondary: string;
  public success: string;
  public teal: string;
  public warning: string;
  public white: string;
  public yellow: string;

  public breakpointXs: string;
  public breakpointSm: string;
  public breakpointMd: string;
  public breakpointLg: string;
  public breakpointXl: string;

  public fontFamilySansSerif: string;
  public fontFamilyMonospace: string;

  constructor() {
    this.update();
  }

  public update() {
    let bodyStyles = window.getComputedStyle(document.body);

    this.blue = bodyStyles.getPropertyValue('--blue');
    this.indigo = bodyStyles.getPropertyValue('--indigo');
    this.purple = bodyStyles.getPropertyValue('--purple');
    this.pink = bodyStyles.getPropertyValue('--pink');
    this.red = bodyStyles.getPropertyValue('--red');
    this.orange = bodyStyles.getPropertyValue('--orange');
    this.yellow = bodyStyles.getPropertyValue('--yellow');
    this.green = bodyStyles.getPropertyValue('--green');
    this.teal = bodyStyles.getPropertyValue('--teal');
    this.cyan = bodyStyles.getPropertyValue('--cyan');
    this.white = bodyStyles.getPropertyValue('--white');
    this.gray = bodyStyles.getPropertyValue('--gray');
    this.grayDark = bodyStyles.getPropertyValue('--gray-dark');
    this.primary = bodyStyles.getPropertyValue('--primary');
    this.secondary = bodyStyles.getPropertyValue('--secondary');
    this.success = bodyStyles.getPropertyValue('--success');
    this.info = bodyStyles.getPropertyValue('--info');
    this.warning = bodyStyles.getPropertyValue('--warning');
    this.danger = bodyStyles.getPropertyValue('--danger');
    this.light = bodyStyles.getPropertyValue('--light');
    this.dark = bodyStyles.getPropertyValue('--dark');
    this.muted = bodyStyles.getPropertyValue('--gray');

    this.breakpointXs = bodyStyles.getPropertyValue('--breakpoint-xs');
    this.breakpointSm = bodyStyles.getPropertyValue('--breakpoint-sm');
    this.breakpointMd = bodyStyles.getPropertyValue('--breakpoint-md');
    this.breakpointLg = bodyStyles.getPropertyValue('--breakpoint-lg');
    this.breakpointXl = bodyStyles.getPropertyValue('--breakpoint-xl');

    this.fontFamilySansSerif = bodyStyles.getPropertyValue('--font-family-sans-serif');
    this.fontFamilyMonospace = bodyStyles.getPropertyValue('--font-family-monospace');

  }
}
