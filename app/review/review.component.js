System.register(['@angular/core', '@angular/router', '../user/user.service', '../game/score.service', './game-search.service'], function(exports_1, context_1) {
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
    var core_1, router_1, user_service_1, score_service_1, game_search_service_1;
    var ReviewComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (score_service_1_1) {
                score_service_1 = score_service_1_1;
            },
            function (game_search_service_1_1) {
                game_search_service_1 = game_search_service_1_1;
            }],
        execute: function() {
            ReviewComponent = (function () {
                function ReviewComponent(router, _userService, _scoreService, _gameSearchService) {
                    this.router = router;
                    this._userService = _userService;
                    this._scoreService = _scoreService;
                    this._gameSearchService = _gameSearchService;
                    this.scoreSummary = [];
                    this.viewSummary = [];
                    this.viewScore = 0;
                }
                //Angular event listener that will fire the HTTP call for the twitch API via the GameService
                ReviewComponent.prototype.ngOnInit = function () {
                    var name = this._userService.getUserName();
                    if (!name) {
                        this.router.navigate(['/home']);
                    }
                    this.scoreSummary = this._scoreService.getSummary();
                    this.viewScore = this._scoreService.getScore();
                    this.loadDataForQuestions();
                };
                ReviewComponent.prototype.loadDataForQuestions = function () {
                    var _this = this;
                    var i = 0;
                    var _loop_1 = function() {
                        var game = this_1.scoreSummary[i];
                        this_1._gameSearchService.getGames(game.name).subscribe(function (games) { return _this.handleGames(games, game); }, function (error) { return console.log(error); });
                    };
                    var this_1 = this;
                    for (i; i < this.scoreSummary.length; i++) {
                        _loop_1();
                    }
                };
                ReviewComponent.prototype.handleGames = function (games, game) {
                    this.viewSummary.push({
                        incorrect: game.incorrect,
                        name: game.name,
                        boxArt: games.length !== 0 ? games[0].box.medium : null
                    });
                };
                ReviewComponent.prototype.leaderBoard = function () {
                    this.router.navigate(['/scores']);
                };
                ReviewComponent = __decorate([
                    core_1.Component({
                        selector: 'review',
                        templateUrl: 'app/review/review.component.html',
                        styleUrls: ['app/review/review.component.css'],
                        providers: [game_search_service_1.GameSearchService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, user_service_1.UserService, score_service_1.ScoreService, game_search_service_1.GameSearchService])
                ], ReviewComponent);
                return ReviewComponent;
            }());
            exports_1("ReviewComponent", ReviewComponent);
        }
    }
});
//# sourceMappingURL=review.component.js.map