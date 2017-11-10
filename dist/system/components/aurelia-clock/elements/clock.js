System.register(["aurelia-framework"], function (exports_1, context_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, ClockCustomElement;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }
        ],
        execute: function () {
            ClockCustomElement = (function () {
                function ClockCustomElement() {
                    this.text = 'Aurelia is awesome';
                    this.color = '#753B85';
                    this.shadowColor = '#C8167A';
                    this.fontSize = '40';
                    this.locale = 'en';
                    this.dateFormat = 'YYYY/MM/DD';
                    this.be24Hours = true;
                    this.showText = true;
                    this.showDate = true;
                    this.showTime = true;
                }
                ClockCustomElement.prototype.attached = function () {
                    var _this = this;
                    this.value = new Date();
                    var self = this;
                    return new Promise(function (resolve) {
                        _this.timer = setInterval(function () {
                            self.value = new Date();
                            console.log(self.value);
                        }, 1000);
                        resolve();
                    });
                };
                ClockCustomElement.prototype.detached = function () {
                    clearTimeout(this.timer);
                };
                __decorate([
                    aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneTime }),
                    __metadata("design:type", String)
                ], ClockCustomElement.prototype, "text", void 0);
                __decorate([
                    aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneTime }),
                    __metadata("design:type", String)
                ], ClockCustomElement.prototype, "color", void 0);
                __decorate([
                    aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneTime }),
                    __metadata("design:type", String)
                ], ClockCustomElement.prototype, "shadowColor", void 0);
                __decorate([
                    aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneTime }),
                    __metadata("design:type", Object)
                ], ClockCustomElement.prototype, "fontSize", void 0);
                __decorate([
                    aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneWay }),
                    __metadata("design:type", String)
                ], ClockCustomElement.prototype, "locale", void 0);
                __decorate([
                    aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneWay }),
                    __metadata("design:type", String)
                ], ClockCustomElement.prototype, "dateFormat", void 0);
                __decorate([
                    aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneWay }),
                    __metadata("design:type", Object)
                ], ClockCustomElement.prototype, "be24Hours", void 0);
                __decorate([
                    aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneWay }),
                    __metadata("design:type", Object)
                ], ClockCustomElement.prototype, "showText", void 0);
                __decorate([
                    aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneWay }),
                    __metadata("design:type", Object)
                ], ClockCustomElement.prototype, "showDate", void 0);
                __decorate([
                    aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneWay }),
                    __metadata("design:type", Object)
                ], ClockCustomElement.prototype, "showTime", void 0);
                ClockCustomElement = __decorate([
                    aurelia_framework_1.customElement('au-clock')
                ], ClockCustomElement);
                return ClockCustomElement;
            }());
            exports_1("ClockCustomElement", ClockCustomElement);
        }
    };
});
