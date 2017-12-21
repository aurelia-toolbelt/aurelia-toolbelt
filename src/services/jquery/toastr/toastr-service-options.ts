// tslint:disable
export interface IToastrServiceOptions {
	showEasing?: string;
	hideEasing?: string;
	showMethod?: string;
	hideMethod?: string;
	closeButton?: boolean;
	closeClass?: string;
	closeDuration?: number;
	closeEasing?: string;
	closeMethod?: string;
	closeOnHover?: boolean;
	closeHtml?: string;
	onCloseClick?: (ev: JQueryMouseEventObject) => void;
	tapToDismiss?: boolean;
	toastClass?: string;
	containerId?: string;
	debug?: boolean;
	showDuration?: number;
	onShown?: () => void;
	hideDuration?: number;
	onHidden?: () => void;
	extendedTimeOut?: number;
	iconClasses?: {
		error: string;
		info: string;
		success: string;
		warning: string;
	};
	iconClass?: string;
	positionClass?: string;
	timeOut?: number;
	titleClass?: string;
	messageClass?: string;
	newestOnTop?: boolean;
	target?: string;
	preventDuplicates?: boolean;
	progressBar?: boolean;
	progressClass?: string;
	onclick?: (ev: JQueryMouseEventObject) => void;
	escapeHtml?: boolean;
	rtl?: boolean;
}