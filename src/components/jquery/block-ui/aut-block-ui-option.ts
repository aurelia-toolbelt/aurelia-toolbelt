export interface IAutBlockUIOption {
  message?: string | Element;
  css?: IAutBlockUICssOption;
  overlayCss?: IAutBlockUIOverlayCssOption;
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
  useSpinner?: boolean;
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
