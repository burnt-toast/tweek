System.register(['@angular/core', '@angular/router', '../scoring/scoring-detail.services', '../scores/scores.service'], function(exports_1, context_1) {
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
    var core_1, router_1, scoring_detail_services_1, scores_service_1;
    var ScoringDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (scoring_detail_services_1_1) {
                scoring_detail_services_1 = scoring_detail_services_1_1;
            },
            function (scores_service_1_1) {
                scores_service_1 = scores_service_1_1;
            }],
        execute: function() {
            ScoringDetailComponent = (function () {
                function ScoringDetailComponent(_router, scoringDetailsService, scoresService) {
                    this._router = _router;
                    this.scoringDetailsService = scoringDetailsService;
                    this.scoresService = scoresService;
                    this.ar = scoringDetailsService.getAnswerResults();
                    this.totalScoreMessage = this.scoringDetailsService.getTotalScoreFormated();
                }
                ScoringDetailComponent.prototype.onBack = function () {
                    this._router.navigate(['playground']);
                };
                ScoringDetailComponent.prototype.submitScore = function () {
                    var _this = this;
                    this.scoresService.postScore({
                        user: "testuser" + Math.random(),
                        score: this.scoringDetailsService.getTotalScore()
                    }).subscribe(function (response) {
                        console.log(response);
                        _this._router.navigate(['topscores']);
                    });
                };
                ScoringDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'scoring-detail',
                        templateUrl: 'app/scoring/scoring-detail.component.html'
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, scoring_detail_services_1.ScoringDetailsService, scores_service_1.ScoresService])
                ], ScoringDetailComponent);
                return ScoringDetailComponent;
            }());
            exports_1("ScoringDetailComponent", ScoringDetailComponent);
        }
    }
});
//# sourceMappingURL=scoring-detail.component.js.map