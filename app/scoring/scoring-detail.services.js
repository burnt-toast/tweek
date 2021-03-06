System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var ScoringDetailsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ScoringDetailsService = (function () {
                function ScoringDetailsService() {
                }
                ScoringDetailsService.prototype.setAnswerResults = function (ar) {
                    this._ar = ar;
                };
                ScoringDetailsService.prototype.getAnswerResults = function () {
                    return this._ar;
                };
                ScoringDetailsService.prototype.getTotalScore = function () {
                    var correct = 0;
                    this._ar.forEach(function (x) { if (x.answeredCorrect)
                        correct++; });
                    return correct;
                };
                ScoringDetailsService.prototype.getTotalQuestions = function () {
                    return this._ar.length;
                };
                ScoringDetailsService.prototype.getTotalScoreFormated = function () {
                    return this.getTotalScore() + '/' + this.getTotalQuestions();
                };
                ScoringDetailsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ScoringDetailsService);
                return ScoringDetailsService;
            }());
            exports_1("ScoringDetailsService", ScoringDetailsService);
        }
    }
});
//# sourceMappingURL=scoring-detail.services.js.map