export interface IAutBlockUIOptions {
  /*message?: any;*/
  /*title?: string;*/
  draggable?: boolean;
  /*theme?: boolean;*/
  css?: any;
  /*themedCSS?: any;*/
  overlayCSS?: any;
  cursorReset?: string;
  /*growlCSS?: any;*/
  iframeSrc?: string;
  forceIframe?: boolean;
  baseZ?: number;
  centerX?: boolean;
  centerY?: boolean;
  allowBodyStretch?: boolean;
  bindEvents?: boolean;
  constrainTabKey?: boolean;
  fadeIn?: number;
  fadeOut?: number;
  timeout?: number;
  showOverlay?: boolean;
  focusInput?: boolean;
  onBlock?: () => void;
  onUnblock?: (element: any, options: any) => void;
  quirksmodeOffsetHack?: number;
  blockMsgClass?: string;
  ignoreIfBlocked?: boolean;
  monitoringOnResize?: boolean;
}
