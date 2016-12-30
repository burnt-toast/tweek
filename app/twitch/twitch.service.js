System.register(['@angular/core', '@angular/http', 'rxjs/Observable', '../question/question'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1, question_1;
    var TwitchService, TwitchCacheService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (question_1_1) {
                question_1 = question_1_1;
            }],
        execute: function() {
            TwitchService = (function () {
                function TwitchService(http) {
                    this.http = http;
                }
                TwitchService.prototype.getTopGames = function () {
                    var url = 'https://api.twitch.tv/kraken/games/top?limit=100';
                    return this.http.get(url).map(function (response) { return response.json(); })
                        .catch(this.handleError);
                };
                TwitchService.prototype.getStream = function (query) {
                    var url = 'https://api.twitch.tv/kraken/search/streams?q=' + query;
                    return this.http.get(url).map(function (response) { return response.json(); })
                        .catch(this.handleError);
                };
                TwitchService.prototype.getRandomStreams = function () {
                    var url = 'https://api.twitch.tv/kraken/beta/streams/random';
                    return this.http.get(url).map(function (response) { return response.json(); })
                        .catch(this.handleError);
                };
                TwitchService.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                TwitchService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], TwitchService);
                return TwitchService;
            }());
            exports_1("TwitchService", TwitchService);
            TwitchCacheService = (function () {
                function TwitchCacheService(twitch) {
                    this.twitch = twitch;
                    this.games = [];
                    this.streams = [];
                    this.reset();
                }
                TwitchCacheService.prototype.reset = function () {
                    this.getGames();
                    this.getRandomStreams();
                    console.log("getting games and streams");
                };
                TwitchCacheService.prototype.getGames = function () {
                    var _this = this;
                    if (this.games.length == 0) {
                        this.twitch.getTopGames().subscribe(function (response) {
                            for (var i = 0; i < response.top.length; i++) {
                                var item = response.top[i].game.name;
                                //console.log(item);
                                _this.games.push(item);
                            }
                            console.log("getting games ended");
                        });
                    }
                    return this.games;
                };
                TwitchCacheService.prototype.getRandomStreams = function () {
                    var _this = this;
                    this.twitch.getRandomStreams().subscribe(function (response) {
                        for (var i = 0; i < response.streams.length; i++) {
                            var item = {
                                'game': response.streams[i].game,
                                //'url': response.streams[i].channel.url,
                                url: response.streams[i].channel.display_name
                            };
                            //console.log(JSON.stringify(item));
                            _this.streams.push(item);
                        }
                        console.log("getting streams ended");
                    });
                };
                TwitchCacheService.prototype.getRandomQuestions = function () {
                    var _this = this;
                    var questions = [];
                    this.streams.forEach(function (x) {
                        var results = _this.getRandomChoices(x.game);
                        var q = new question_1.Question(results[1], "What game is this?", results[0], x.url);
                        questions.push(q);
                    });
                    return questions;
                };
                TwitchCacheService.prototype.getRandomChoices = function (correctChoice, difficulty) {
                    if (difficulty === void 0) { difficulty = 3; }
                    var choices = [correctChoice];
                    for (var i = 0; i < 3; i++) {
                        var index = this.getRandomInt(0, this.games.length);
                        var game = this.games[index];
                        choices.push(game);
                    }
                    this.shuffle(choices);
                    var correctIndex = -1;
                    for (var i = 0; i < choices.length; i++) {
                        if (choices[i] == correctChoice) {
                            correctIndex = i;
                            break;
                        }
                    }
                    var tuple = [choices, correctIndex];
                    return tuple;
                };
                TwitchCacheService.prototype.shuffle = function (array) {
                    var currentIndex = array.length, temporaryValue, randomIndex;
                    // While there remain elements to shuffle...
                    while (0 !== currentIndex) {
                        // Pick a remaining element...
                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex -= 1;
                        // And swap it with the current element.
                        temporaryValue = array[currentIndex];
                        array[currentIndex] = array[randomIndex];
                        array[randomIndex] = temporaryValue;
                    }
                    return array;
                };
                TwitchCacheService.prototype.getRandomInt = function (min, max) {
                    return Math.floor(Math.random() * (max - min)) + min;
                };
                TwitchCacheService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [TwitchService])
                ], TwitchCacheService);
                return TwitchCacheService;
            }());
            exports_1("TwitchCacheService", TwitchCacheService);
        }
    }
});
//# sourceMappingURL=twitch.service.js.map