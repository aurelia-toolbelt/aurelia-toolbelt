export interface IAutBlockUIOption {
  message?: string;
  draggable?: boolean;
  css?: IAutBlockUICssOption;
  overlayCSS?: IAutBlockUIOverlayCssOption;
  cursorReset?: string;
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
  quirksmodeOffsetHack?: number;
  blockMsgClass?: string;
  ignoreIfBlocked?: boolean;
  useSpinner?: true;
  spinnerColor?: string;
  spinnerSize?: string;
}
export interface IAutBlockUICssOption {
  padding?: string;
  margin?: string;
  width?: string;
  top?: string;
  left?: string;
  textAlign?: string;
  color?: string;
  border?: string;
  backgroundColor?: string;
  cursor?: string;
}
export interface IAutBlockUIOverlayCssOption {
  opacity?: number;
  backgroundColor?: string;
  cursor?: string;
}
