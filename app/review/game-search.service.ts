import {Injectable, Inject} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GameSearchService{

  constructor(private http: Http) {}

  private twitchStreamURL = 'https://api.twitch.tv/kraken/search/games?type=suggest&live=true&q=';

  /**
  Get the streams from the Twitch API
  */
  getGames(gameName) : Observable <String[]> {
    return this.http.get(this.twitchStreamURL + gameName)
                    .map(this.extractData).catch(this.handleError);
  }


  private extractData(res: Response) {
    if(res.status < 200 || res.status >= 300) {
      throw new Error('Bad response code');
    }

    let body = res.json();
    return  body.games || [];
  }


  private handleError (error : any) {
    return Observable.throw('Unable to reach game search API');
  }
}
