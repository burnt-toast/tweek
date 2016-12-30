System.register(['@angular/core', '@angular/common'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1;
    var ScoringComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            ScoringComponent = (function () {
                function ScoringComponent() {
                    this.questions = [];
                    this.width = 52;
                    this.heigth = 52;
                    this.url = '/assets/tweek_pic.png';
                }
                ScoringComponent.prototype.reset = function () {
                    this.questions = [];
                    for (var index = 0; index < this.maxQuestions; index++) {
                        this.questions[index] = false;
                    }
                };
                ScoringComponent.prototype.ngOnInit = function () {
                    this.reset();
                };
                ScoringComponent.prototype.ngOnChanges = function (changes) {
                    if ("questionsAnswered" in changes) {
                        var index = changes.questionsAnswered.previousValue;
                        this.questions[index] = true;
                        if (changes.questionsAnswered.currentValue == 0) {
                            this.reset();
                        }
                    }
                    console.log(changes);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], ScoringComponent.prototype, "questionsAnswered", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], ScoringComponent.prototype, "maxQuestions", void 0);
                ScoringComponent = __decorate([
                    core_1.Component({
                        selector: 'scoring',
                        templateUrl: 'app/scoring/scoring.component.html',
                        styleUrls: ['app/scoring/scoring.css'],
                        directives: [common_1.NgClass]
                    }), 
                    __metadata('design:paramtypes', [])
                ], ScoringComponent);
                return ScoringComponent;
            }());
            exports_1("ScoringComponent", ScoringComponent);
        }
    }
});
//# sourceMappingURL=scoring.component.js.map