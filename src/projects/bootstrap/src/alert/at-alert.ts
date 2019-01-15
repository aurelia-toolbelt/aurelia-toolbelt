import { bindable } from "aurelia-templating";
import { ContextualVariant } from "../shared/contextual-variant";


export class AtAlert {

    @bindable() variant : ContextualVariant = ContextualVariant.Danger;

}
