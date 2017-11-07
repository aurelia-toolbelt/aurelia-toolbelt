var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "./StarRateClicked"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, StarRateClicked_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var StarRate = (function () {
        function StarRate(ea) {
            this.ea = ea;
            this.readOnly = true;
            this.color = '#753B85';
            this.rtl = false;
            this.fullStar = 'au-star au-full-star';
            this.halfStar = null;
            this.emptyStar = 'au-star au-empty-star';
            this.mouseRate = -1;
            this.showHalfStar = false;
        }
        StarRate.prototype.mouseMove = function (event, index) {
            if (this.readOnly) {
                return;
            }
            if (this.halfStar) {
                var calculatedIndex = this.rtl ? this.maxRate - index - 1 : index;
                var controlLeft = this.rtl ? this.icons[calculatedIndex].getBoundingClientRect().right : this.icons[calculatedIndex].getBoundingClientRect().left;
                var currentMousePosition = this.rtl ? controlLeft - event.clientX : event.clientX - controlLeft;
                this.showHalfStar = currentMousePosition < (this.icons[calculatedIndex].clientWidth / 2);
            }
            this.mouseRate = index + 1 - (this.showHalfStar ? 0.5 : 0);
        };
        StarRate.prototype.setRate = function (index) {
            if (this.readOnly) {
                return;
            }
            var oldValue = this.rate;
            this.rate = index + 1 - (this.showHalfStar ? 0.5 : 0);
            if (this.clicked) {
                this.clicked({ newRate: this.rate, oldRate: oldValue });
            }
            this.ea.publish(new StarRateClicked_1.StarRateClicked(this.rate, oldValue));
        };
        StarRate.prototype.mouseLeft = function () {
            if (this.readOnly) {
                return;
            }
            this.showHalfStar = false;
            this.mouseRate = -1;
        };
        Object.defineProperty(StarRate.prototype, "currentValue", {
            get: function () {
                var x = (this.mouseRate !== -1 ? this.mouseRate : this.rate);
                return x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StarRate.prototype, "hasFloatingPoint", {
            get: function () {
                var mode = this.currentValue % 1;
                return mode > 0 && mode < 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StarRate.prototype, "fixedPoint", {
            get: function () {
                return Math.floor(this.currentValue);
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Number)
        ], StarRate.prototype, "rate", void 0);
        __decorate([
            aurelia_framework_1.bindable,
            __metadata("design:type", Number)
        ], StarRate.prototype, "maxRate", void 0);
        __decorate([
            aurelia_framework_1.bindable,
            __metadata("design:type", Object)
        ], StarRate.prototype, "readOnly", void 0);
        __decorate([
            aurelia_framework_1.bindable,
            __metadata("design:type", Object)
        ], StarRate.prototype, "color", void 0);
        __decorate([
            aurelia_framework_1.bindable,
            __metadata("design:type", Object)
        ], StarRate.prototype, "rtl", void 0);
        __decorate([
            aurelia_framework_1.bindable,
            __metadata("design:type", Object)
        ], StarRate.prototype, "fullStar", void 0);
        __decorate([
            aurelia_framework_1.bindable,
            __metadata("design:type", String)
        ], StarRate.prototype, "halfStar", void 0);
        __decorate([
            aurelia_framework_1.bindable,
            __metadata("design:type", Object)
        ], StarRate.prototype, "emptyStar", void 0);
        __decorate([
            aurelia_framework_1.bindable,
            __metadata("design:type", Object)
        ], StarRate.prototype, "clicked", void 0);
        __decorate([
            aurelia_framework_1.children('i'),
            __metadata("design:type", Array)
        ], StarRate.prototype, "icons", void 0);
        __decorate([
            aurelia_framework_1.computedFrom('mouseRate', 'rate'),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], StarRate.prototype, "currentValue", null);
        __decorate([
            aurelia_framework_1.computedFrom('currentValue'),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], StarRate.prototype, "hasFloatingPoint", null);
        __decorate([
            aurelia_framework_1.computedFrom('currentValue'),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], StarRate.prototype, "fixedPoint", null);
        StarRate = __decorate([
            aurelia_framework_1.customElement('au-star-rate'),
            aurelia_framework_1.inject(aurelia_event_aggregator_1.EventAggregator),
            __metadata("design:paramtypes", [aurelia_event_aggregator_1.EventAggregator])
        ], StarRate);
        return StarRate;
    }());
    exports.StarRate = StarRate;
});
