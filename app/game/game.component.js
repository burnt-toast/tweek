System.register(['@angular/core', './game.service', './shuffle.service', './score.service', '../user/user.service', '@angular/router'], function(exports_1, context_1) {
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
    var core_1, game_service_1, shuffle_service_1, score_service_1, user_service_1, router_1;
    var GameComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (game_service_1_1) {
                game_service_1 = game_service_1_1;
            },
            function (shuffle_service_1_1) {
                shuffle_service_1 = shuffle_service_1_1;
            },
            function (score_service_1_1) {
                score_service_1 = score_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            GameComponent = (function () {
                function GameComponent(_gameService, el, _shuffle, _scoreService, _userService, router) {
                    this._gameService = _gameService;
                    this.el = el;
                    this._shuffle = _shuffle;
                    this._scoreService = _scoreService;
                    this._userService = _userService;
                    this.router = router;
                    this.streams = [];
                    this.question = {};
                    this.incorrect = false;
                    this.quadrantIndex = 0;
                    this.shrinkCount = 0;
                    this.currentQuadrant = null;
                    this.quadrantArray = ['topLeftQuadrant', 'topRightQuadrant', 'bottomRightQuadrant', 'bottomLeftQuadrant'];
                    this.blockGuess = false;
                    this.currentQuestionSummary = this.initCurrenQuestionSummary();
                }
                //Angular event listener that will fire the HTTP call for the twitch API via the GameService
                GameComponent.prototype.ngOnInit = function () {
                    var name = this._userService.getUserName();
                    if (!name) {
                        this.router.navigate(['/home']);
                    }
                    this._scoreService.clear();
                    this.loadQuestions(true);
                };
                GameComponent.prototype.initCurrenQuestionSummary = function () {
                    return {
                        incorrect: 0,
                        name: ''
                    };
                };
                //loads questions either on init or on correct answer
                GameComponent.prototype.loadQuestions = function (shuffle) {
                    var _this = this;
                    this._gameService.getStreams().subscribe(function (streams) { return _this.handleStreams(streams); }, function (error) { return console.log(error); });
                    if (shuffle) {
                        this.quadrantArray = this._shuffle.shuffle(this.quadrantArray);
                    }
                    this.currentQuestionSummary = this.initCurrenQuestionSummary();
                };
                //success function for retrieving games list, we retrieve 50 and randomize what we use from there
                GameComponent.prototype.handleStreams = function (streams) {
                    this.streams = this._gameService.getSubsetOfResults(streams);
                    this.question = this._gameService.formatQuestion(this.streams);
                    var q = this.question;
                    this.currentQuestionSummary.name = q.name;
                    if (this.currentQuadrant === null) {
                        this.currentQuadrant = this.el.nativeElement.getElementsByClassName(this.quadrantArray[this.quadrantIndex])[0];
                    }
                    this.startTimer();
                };
                //We have injected the element reference so that we can manipulate the elements opacity. Using the DOM becuase when using bindings
                //by the time the lifecycle execute you were missing most of the transition
                GameComponent.prototype.startTimer = function () {
                    setTimeout(function () {
                        if (this.shrinkCount !== 5 && this.currentQuadrant !== undefined) {
                            this.currentQuadrant.style.opacity = this.currentQuadrant.style.opacity - .2;
                            this.shrinkCount++;
                        }
                        else {
                            this.shrinkCount = 0;
                            this.quadrantIndex++;
                            this.currentQuadrant = this.el.nativeElement.getElementsByClassName(this.quadrantArray[this.quadrantIndex])[0];
                        }
                        if (this.quadrantIndex < 4) {
                            this.startTimer();
                        }
                        else {
                            this.timesUpProcess();
                        }
                    }.bind(this), 2000);
                };
                //On answer verify if it is correct
                GameComponent.prototype.verifyAnswer = function (choice) {
                    var answer = choice;
                    if (!answer.correct) {
                        this.incorrect = true;
                        this.blockGuess = true;
                        this.currentQuestionSummary.incorrect += 1;
                        setTimeout(function () {
                            this.blockGuess = false;
                        }.bind(this), 2000);
                        this._scoreService.incorrectAnswer();
                    }
                    else {
                        this._scoreService.addSummary(this.currentQuestionSummary);
                        this.incorrect = false;
                        this._scoreService.correctAnswer(this.quadrantIndex);
                        this.loadQuestions(false);
                    }
                };
                GameComponent.prototype.timesUpProcess = function () {
                    this.router.navigate(['/review']);
                };
                GameComponent = __decorate([
                    core_1.Component({
                        selector: 'game',
                        templateUrl: 'app/game/game.component.html',
                        styleUrls: ['app/game/game.component.css'],
                        providers: [game_service_1.GameService, shuffle_service_1.ShuffleService]
                    }), 
                    __metadata('design:paramtypes', [game_service_1.GameService, core_1.ElementRef, shuffle_service_1.ShuffleService, score_service_1.ScoreService, user_service_1.UserService, router_1.Router])
                ], GameComponent);
                return GameComponent;
            }());
            exports_1("GameComponent", GameComponent);
        }
    }
});
//# sourceMappingURL=game.component.js.map