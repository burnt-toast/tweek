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
    var ScoreService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ScoreService = (function () {
                function ScoreService() {
                    this.score = 0;
                    this.summary = [];
                }
                //Dedecut points for incorrect guess
                ScoreService.prototype.incorrectAnswer = function () {
                    this.score = this.score - 2;
                };
                //determine score based on how many seconds were remaining for that questions
                ScoreService.prototype.correctAnswer = function (quadrantsRevealed) {
                    if (quadrantsRevealed === 1) {
                        this.score = this.score + 10;
                    }
                    else if (quadrantsRevealed === 2) {
                        this.score = this.score + 8;
                    }
                    else if (quadrantsRevealed === 3) {
                        this.score = this.score + 6;
                    }
                    else if (quadrantsRevealed === 4) {
                        this.score = this.score + 4;
                    }
                };
                ScoreService.prototype.getSummary = function () {
                    return this.summary;
                };
                ScoreService.prototype.clear = function () {
                    this.score = 0;
                    this.summary = [];
                };
                ScoreService.prototype.addSummary = function (summary) {
                    this.summary.push(summary);
                };
                ScoreService.prototype.getScore = function () {
                    return this.score;
                };
                ScoreService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ScoreService);
                return ScoreService;
            }());
            exports_1("ScoreService", ScoreService);
        }
    }
});
//# sourceMappingURL=score.service.js.map