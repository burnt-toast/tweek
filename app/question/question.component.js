System.register(['@angular/core', './question', './question.service'], function(exports_1, context_1) {
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
    var core_1, question_1, question_service_1;
    var QuestionComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (question_1_1) {
                question_1 = question_1_1;
            },
            function (question_service_1_1) {
                question_service_1 = question_service_1_1;
            }],
        execute: function() {
            QuestionComponent = (function () {
                function QuestionComponent(qService) {
                    this.qService = qService;
                    this.answerResultsClicked = new core_1.EventEmitter();
                    this.questionPublished = new core_1.EventEmitter();
                }
                QuestionComponent.prototype.ngOnInit = function () {
                    this.getNewQuestion();
                };
                QuestionComponent.prototype.submitAnswer = function () {
                    var results = this.question.getAnswer() == this.selectedAnswer;
                    this.message = 'You answered : ' + results;
                    var ar = new question_1.AnswerResults(this.question, this.selectedAnswer, results);
                    console.log("publishing ar: " + ar);
                    this.answerResultsClicked.emit(ar);
                    this.getNewQuestion();
                };
                QuestionComponent.prototype.getNewQuestion = function () {
                    var q = this.qService.getNextQuestion();
                    this.questionPublished.emit(q);
                    console.log("publishing q: " + q);
                    this.question = q;
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], QuestionComponent.prototype, "answerResultsClicked", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], QuestionComponent.prototype, "questionPublished", void 0);
                QuestionComponent = __decorate([
                    core_1.Component({
                        selector: "question",
                        templateUrl: 'app/question/question.component.html'
                    }), 
                    __metadata('design:paramtypes', [question_service_1.QuestionService])
                ], QuestionComponent);
                return QuestionComponent;
            }());
            exports_1("QuestionComponent", QuestionComponent);
        }
    }
});
//# sourceMappingURL=question.component.js.map