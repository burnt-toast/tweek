import {Injectable, Inject} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ShuffleService} from './shuffle.service';

@Injectable()
export class GameService{

  constructor(private http: Http, private _shuffle: ShuffleService) {}

  private twitchStreamURL = 'https://api.twitch.tv/kraken/search/streams?limit=50&q=';
  private alpha = 'abcdefghijklmnopqrstuvwxyz';

  /**
  Get the streams from the Twitch API
  */
  getStreams() : Observable <String[]> {
    return this.http.get(this.twitchStreamURL + this.getRandomSearchString())
                    .map(this.extractData).catch(this.handleError);
  }

  // Get a subset of the results returned from the API for the game
  getSubsetOfResults(streams: String []) {
    this.cleanList(streams);

    if(streams && streams.length > 5){
        let i = 0;
        let choices = [];
        for(i; i < 5; i++) {
          choices.push(this.getUniqueChoice(streams, choices))
        }
        return choices;
      }
      return [];
  }

  private cleanList(streams) {
    if(streams) {
      let i = 0;
      for(i; i < streams.length; i++) {
        let name = streams[i].game;
        if(name == null || name == "") {
          streams.splice(i, 1);
        }
        if(streams[i].viewers == 0) {
          streams.splice(i, 1);
        }
      }
      return streams;
    }
  }

  private getUniqueChoice(streams, choicesUsed) {
    let choice = null;
    do {
      choice = this.getRandomChoice(streams);
    } while(!this.isUniqueChoice(choicesUsed, choice));
    return choice;
  }

  private getRandomChoice(streams) {
    let random = Math.floor(Math.random() * streams.length);
    //this gets the value and removes from list so not used again
    let choice = streams.splice(random, 1)[0];
    return choice;
  }

  private isUniqueChoice(choices, candidate) {
      if(choices) {
        let i = 0;
        for(i; i < choices.length; i++) {
          if(choices[i].game == candidate.game) {
            return false;
          }
        }
      }
      return true;
  }

//builds the question object the UI will display
  formatQuestion(streams){
    let question = {
      image: streams[0].preview.large,
      name: streams[0].game,
      choices: []
    };

    let i =0;
    for(i; i < streams.length; i++) {
      question.choices.push({option : streams[i].game, correct: i === 0 ? true : false});
    }

    question.choices = this._shuffle.shuffle(question.choices);
    return question;

  }


//Pick a random letter of the alphabet to search for
private getRandomSearchString() {
  let random = Math.floor(Math.random() * 26);
  return this.alpha[random];
}


  private extractData(res: Response) {
    if(res.status < 200 || res.status >= 300) {
      throw new Error('Bad response code');
    }

    let body = res.json();
    return  body.streams;
  }


  private handleError (error : any) {
    return Observable.throw('Unable to reach stream API');
  }
}
