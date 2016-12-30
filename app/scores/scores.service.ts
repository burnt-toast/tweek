import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { IScore } from './score'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ScoresService {
    constructor(private http: Http) { }
    getScores(): Observable<IScore[]> {
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        var url = 'http://tweek-app.herokuapp.com/leaderboard';
        return this.http.get(url, options)
            .map((response: Response) => <IScore[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    postScore(score: any) {
        var url = 'http://tweek-app.herokuapp.com/score';
        let body = JSON.stringify(score);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
