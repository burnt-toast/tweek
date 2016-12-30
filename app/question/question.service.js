System.register(['@angular/core', './Question', '../twitch/twitch.service'], function(exports_1, context_1) {
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
    var core_1, Question_1, twitch_service_1;
    var QuestionService, Q_TEST;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Question_1_1) {
                Question_1 = Question_1_1;
            },
            function (twitch_service_1_1) {
                twitch_service_1 = twitch_service_1_1;
            }],
        execute: function() {
            QuestionService = (function () {
                function QuestionService(twitch) {
                    this.twitch = twitch;
                    this.questions = Q_TEST.slice();
                }
                QuestionService.prototype.getQuestions = function () {
                    //update code here to get questions from actual twith server, this will catch the code
                    if (this.questions.length == 0) {
                        this.questions = this.twitch.getRandomQuestions();
                    }
                    return this.questions;
                };
                QuestionService.prototype.getNextQuestion = function () {
                    var index = this.getRandomInt(0, this.getQuestions().length);
                    var q = this.getQuestions()[index];
                    this.questions.splice(index);
                    return q;
                };
                QuestionService.prototype.getRandomInt = function (min, max) {
                    return Math.floor(Math.random() * (max - min)) + min;
                };
                QuestionService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [twitch_service_1.TwitchCacheService])
                ], QuestionService);
                return QuestionService;
            }());
            exports_1("QuestionService", QuestionService);
            Q_TEST = [
                new Question_1.Question(0, 'What is divisible by 2?', ['10', '7', '13', '15'], 'http://player.twitch.tv/?channel=neshapotamus'),
            ];
        }
    }
});
//# sourceMappingURL=question.service.js.map