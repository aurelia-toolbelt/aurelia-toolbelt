import { EventAggregator } from 'aurelia-event-aggregator';
export declare class StarRate {
    private ea;
    rate: number;
    maxRate: number;
    readOnly: boolean;
    color: string;
    rtl: boolean;
    fullStar: string;
    halfStar: string | null;
    emptyStar: string;
    clicked: any;
    private icons;
    private mouseRate;
    private showHalfStar;
    constructor(ea: EventAggregator);
    private mouseMove(event, index);
    private setRate(index);
    private mouseLeft();
    private readonly currentValue;
    private readonly hasFloatingPoint;
    readonly fixedPoint: number;
}
