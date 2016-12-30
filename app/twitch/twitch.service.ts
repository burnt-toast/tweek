import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import { Question } from '../question/question'

@Injectable()
export class TwitchService {

    constructor(private http: Http) { }

    getTopGames() {
        let url = 'https://api.twitch.tv/kraken/games/top?limit=100'
        return this.http.get(url).map((response: Response) => response.json())
            //.do(data => console.log('getTopGames: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getStream(query: string) {
        let url = 'https://api.twitch.tv/kraken/search/streams?q=' + query;
        return this.http.get(url).map((response: Response) => response.json())
            //.do(data => console.log('getTopGames: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getRandomStreams() {
        let url = 'https://api.twitch.tv/kraken/beta/streams/random';
        return this.http.get(url).map((response: Response) => response.json())
            //.do(data => console.log('getTopGames: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }



    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}

@Injectable()
export class TwitchCacheService {
    private games: string[] = []
    private streams: any[] = []

    constructor(private twitch: TwitchService) {
        this.reset();
    }

    public reset(): void {
        this.getGames();
        this.getRandomStreams();
        console.log("getting games and streams");
    }

    getGames(): string[] {
        if (this.games.length == 0) {
            this.twitch.getTopGames().subscribe((response: any) => {
                for (var i = 0; i < response.top.length; i++) {
                    var item = response.top[i].game.name;
                    //console.log(item);
                    this.games.push(item);
                }
                console.log("getting games ended");
            });
        }
        return this.games;
    }

    getRandomStreams() {
        this.twitch.getRandomStreams().subscribe((response: any) => {
            for (var i = 0; i < response.streams.length; i++) {
                let item = {
                    'game': response.streams[i].game,
                    //'url': response.streams[i].channel.url,
                    url: response.streams[i].channel.display_name
                };
                //console.log(JSON.stringify(item));

                this.streams.push(item)
            }
            console.log("getting streams ended");
        });
    }

    getRandomQuestions(): Question[] {
        let questions = [];
        this.streams.forEach(x => {
            var results = this.getRandomChoices(x.game)
            let q = new Question(results[1], "What game is this?", results[0], x.url);
            questions.push(q);
        })
        return questions;
    }

    private getRandomChoices(correctChoice: string, difficulty = 3): [string[], number] {
        var choices = [correctChoice];

        for (var i = 0; i < 3; i++) {
            let index = this.getRandomInt(0, this.games.length);
            var game = this.games[index];
            choices.push(game);
        }

        this.shuffle(choices);
        
        let correctIndex = -1;
        for (var i = 0; i < choices.length; i++) {
            if ( choices[i] == correctChoice ){
                 correctIndex = i;
                 break;
            }
        }
        
        var tuple: [string[], number] = [choices, correctIndex];
        return tuple;
    }

    private shuffle(array: any[]) {
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
    }

    private getRandomInt(min, max): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}