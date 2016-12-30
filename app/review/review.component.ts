import { Component, OnInit, ElementRef} from '@angular/core';
import {Router}  from '@angular/router';
import {UserService} from '../user/user.service';
import {ScoreService} from '../game/score.service';
import {GameSearchService} from './game-search.service';

@Component({
    selector: 'review',
    templateUrl: 'app/review/review.component.html',
    styleUrls: ['app/review/review.component.css'],
    providers: [GameSearchService]
})
export class ReviewComponent implements OnInit {
  scoreSummary = [];
  viewSummary = [];
  viewScore = 0;

  constructor(private router: Router, private _userService: UserService, private _scoreService : ScoreService,
              private _gameSearchService : GameSearchService) {}

//Angular event listener that will fire the HTTP call for the twitch API via the GameService
  ngOnInit() {
    let name = this._userService.getUserName();
    if(!name) {
      this.router.navigate(['/home']);
    }
    this.scoreSummary = this._scoreService.getSummary();
    this.viewScore = this._scoreService.getScore();
    this.loadDataForQuestions();
  }

  private loadDataForQuestions() {
    let i=0;
    for(i; i<this.scoreSummary.length; i++) {
      let game = this.scoreSummary[i];
      this._gameSearchService.getGames(game.name).subscribe(games => this.handleGames(games, game), error => console.log(error));
    }
  }

private handleGames(games, game) {
    this.viewSummary.push({
      incorrect : game.incorrect,
      name: game.name,
      boxArt: games.length !== 0 ?games[0].box.medium : null
    });

}

leaderBoard() {
    this.router.navigate(['/scores']);
}

}
