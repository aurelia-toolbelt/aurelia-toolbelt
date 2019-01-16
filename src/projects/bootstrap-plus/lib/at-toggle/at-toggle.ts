import { bindable } from "aurelia-templating";
import { ContextualVariant } from "../shared/contextual-variant";


export class AtToggle {

    @bindable() variant : ContextualVariant = ContextualVariant.Danger;

}
