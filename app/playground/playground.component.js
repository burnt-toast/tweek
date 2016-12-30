System.register(['@angular/core', '../question/question.component', '../plugin/plugin.component', '../scoring/scoring.component', '@angular/router', '../scoring/scoring-detail.services', '../twitch/twitch.service'], function(exports_1, context_1) {
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
    var core_1, question_component_1, plugin_component_1, scoring_component_1, router_1, scoring_detail_services_1, twitch_service_1;
    var PlaygroundComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (question_component_1_1) {
                question_component_1 = question_component_1_1;
            },
            function (plugin_component_1_1) {
                plugin_component_1 = plugin_component_1_1;
            },
            function (scoring_component_1_1) {
                scoring_component_1 = scoring_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (scoring_detail_services_1_1) {
                scoring_detail_services_1 = scoring_detail_services_1_1;
            },
            function (twitch_service_1_1) {
                twitch_service_1 = twitch_service_1_1;
            }],
        execute: function() {
            PlaygroundComponent = (function () {
                function PlaygroundComponent(router, scoringDetailsService, twitch) {
                    this.router = router;
                    this.scoringDetailsService = scoringDetailsService;
                    this.twitch = twitch;
                    this.currentChannel = 'http://player.twitch.tv/?channel=neshapotamus';
                }
                PlaygroundComponent.prototype.answerRecieved = function (ar) {
                    this.history.push(ar);
                    //console.log("added to ar");
                    this.currentQuestion++;
                    if (this.currentQuestion >= this.maxQuestions) {
                        this.scoringDetailsService.setAnswerResults(this.history);
                        this.router.navigate(['scoreDetails']);
                        this.reset();
                    }
                    //update score
                };
                PlaygroundComponent.prototype.questionRecieved = function (q) {
                    this.currentChannel = 'http://player.twitch.tv/?channel=' + q.url;
                };
                PlaygroundComponent.prototype.reset = function () {
                    this.currentQuestion = 0;
                    this.maxQuestions = 4;
                    this.history = [];
                };
                PlaygroundComponent.prototype.ngOnInit = function () {
                    this.reset();
                };
                PlaygroundComponent = __decorate([
                    core_1.Component({
                        selector: 'playground',
                        templateUrl: 'app/playground/playground.component.html',
                        directives: [question_component_1.QuestionComponent,
                            plugin_component_1.PluginComponent,
                            scoring_component_1.ScoringComponent],
                        providers: []
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, scoring_detail_services_1.ScoringDetailsService, twitch_service_1.TwitchCacheService])
                ], PlaygroundComponent);
                return PlaygroundComponent;
            }());
            exports_1("PlaygroundComponent", PlaygroundComponent);
        }
    }
});
//# sourceMappingURL=playground.component.js.map