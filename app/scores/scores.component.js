System.register(['@angular/core', './scores.service'], function(exports_1, context_1) {
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
    var core_1, scores_service_1;
    var ScoresComponent, SCORES;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (scores_service_1_1) {
                scores_service_1 = scores_service_1_1;
            }],
        execute: function() {
            ScoresComponent = (function () {
                function ScoresComponent(scoresService) {
                    this.scoresService = scoresService;
                    this.pageTitle = 'Top  Scores';
                    this.scores = [];
                }
                ScoresComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.scoresService.getScores()
                        .subscribe(function (response) { return _this.scores = response; });
                };
                ScoresComponent = __decorate([
                    core_1.Component({
                        selector: 'top-scores',
                        templateUrl: 'app/scores/scores.component.html'
                    }), 
                    __metadata('design:paramtypes', [scores_service_1.ScoresService])
                ], ScoresComponent);
                return ScoresComponent;
            }());
            exports_1("ScoresComponent", ScoresComponent);
            SCORES = [
                { name: "Nesh", score: 123456.00 },
                { name: "Evan", score: 123456.00 },
                { name: "John", score: 123456.00 },
                { name: "Jake", score: 123456.00 },
            ];
        }
    }
});
//# sourceMappingURL=scores.component.js.map