System.register(['@angular/core', '@angular/http', 'rxjs/Observable', './shuffle.service'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1, shuffle_service_1;
    var GameService;
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
            function (shuffle_service_1_1) {
                shuffle_service_1 = shuffle_service_1_1;
            }],
        execute: function() {
            GameService = (function () {
                function GameService(http, _shuffle) {
                    this.http = http;
                    this._shuffle = _shuffle;
                    this.twitchStreamURL = 'https://api.twitch.tv/kraken/search/streams?limit=50&q=';
                    this.alpha = 'abcdefghijklmnopqrstuvwxyz';
                }
                /**
                Get the streams from the Twitch API
                */
                GameService.prototype.getStreams = function () {
                    return this.http.get(this.twitchStreamURL + this.getRandomSearchString())
                        .map(this.extractData).catch(this.handleError);
                };
                // Get a subset of the results returned from the API for the game
                GameService.prototype.getSubsetOfResults = function (streams) {
                    this.cleanList(streams);
                    if (streams && streams.length > 5) {
                        var i = 0;
                        var choices = [];
                        for (i; i < 5; i++) {
                            choices.push(this.getUniqueChoice(streams, choices));
                        }
                        return choices;
                    }
                    return [];
                };
                GameService.prototype.cleanList = function (streams) {
                    if (streams) {
                        var i = 0;
                        for (i; i < streams.length; i++) {
                            var name_1 = streams[i].game;
                            if (name_1 == null || name_1 == "") {
                                streams.splice(i, 1);
                            }
                            if (streams[i].viewers == 0) {
                                streams.splice(i, 1);
                            }
                        }
                        return streams;
                    }
                };
                GameService.prototype.getUniqueChoice = function (streams, choicesUsed) {
                    var choice = null;
                    do {
                        choice = this.getRandomChoice(streams);
                    } while (!this.isUniqueChoice(choicesUsed, choice));
                    return choice;
                };
                GameService.prototype.getRandomChoice = function (streams) {
                    var random = Math.floor(Math.random() * streams.length);
                    //this gets the value and removes from list so not used again
                    var choice = streams.splice(random, 1)[0];
                    return choice;
                };
                GameService.prototype.isUniqueChoice = function (choices, candidate) {
                    if (choices) {
                        var i = 0;
                        for (i; i < choices.length; i++) {
                            if (choices[i].game == candidate.game) {
                                return false;
                            }
                        }
                    }
                    return true;
                };
                //builds the question object the UI will display
                GameService.prototype.formatQuestion = function (streams) {
                    var question = {
                        image: streams[0].preview.large,
                        name: streams[0].game,
                        choices: []
                    };
                    var i = 0;
                    for (i; i < streams.length; i++) {
                        question.choices.push({ option: streams[i].game, correct: i === 0 ? true : false });
                    }
                    question.choices = this._shuffle.shuffle(question.choices);
                    return question;
                };
                //Pick a random letter of the alphabet to search for
                GameService.prototype.getRandomSearchString = function () {
                    var random = Math.floor(Math.random() * 26);
                    return this.alpha[random];
                };
                GameService.prototype.extractData = function (res) {
                    if (res.status < 200 || res.status >= 300) {
                        throw new Error('Bad response code');
                    }
                    var body = res.json();
                    return body.streams;
                };
                GameService.prototype.handleError = function (error) {
                    return Observable_1.Observable.throw('Unable to reach stream API');
                };
                GameService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, shuffle_service_1.ShuffleService])
                ], GameService);
                return GameService;
            }());
            exports_1("GameService", GameService);
        }
    }
});
//# sourceMappingURL=game.service.js.map