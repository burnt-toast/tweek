System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Question, AnswerResults;
    return {
        setters:[],
        execute: function() {
            Question = (function () {
                function Question(correctAnswerIndex, text, choices, url) {
                    this.correctAnswerIndex = correctAnswerIndex;
                    this.text = text;
                    this.choices = choices;
                    this.url = url;
                }
                Question.prototype.getAnswer = function () {
                    return this.choices[this.correctAnswerIndex];
                };
                return Question;
            }());
            exports_1("Question", Question);
            AnswerResults = (function () {
                function AnswerResults(question, yourAnswer, answeredCorrect) {
                    this.question = question;
                    this.yourAnswer = yourAnswer;
                    this.answeredCorrect = answeredCorrect;
                }
                return AnswerResults;
            }());
            exports_1("AnswerResults", AnswerResults);
        }
    }
});
//# sourceMappingURL=question.js.map