System.register(['@angular/core', '@angular/http', 'rxjs/Observable'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1;
    var ScoresService;
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
            }],
        execute: function() {
            ScoresService = (function () {
                function ScoresService(http) {
                    this.http = http;
                }
                ScoresService.prototype.getScores = function () {
                    var headers = new http_1.Headers();
                    var options = new http_1.RequestOptions({ headers: headers });
                    var url = 'http://tweek-app.herokuapp.com/leaderboard';
                    return this.http.get(url, options)
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
                        .catch(this.handleError);
                };
                ScoresService.prototype.postScore = function (score) {
                    var url = 'http://tweek-app.herokuapp.com/score';
                    var body = JSON.stringify(score);
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(url, body, options)
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                ScoresService.prototype.extractData = function (res) {
                    if (res.status < 200 || res.status >= 300) {
                        throw new Error('Bad response status: ' + res.status);
                    }
                    var body = res.json();
                    return body.data || {};
                };
                ScoresService.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                ScoresService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], ScoresService);
                return ScoresService;
            }());
            exports_1("ScoresService", ScoresService);
        }
    }
});
//# sourceMappingURL=scores.service.js.map