import { Component, OnInit, ElementRef} from '@angular/core';
import {GameService} from './game.service';
import {ShuffleService} from './shuffle.service';
import {ScoreService} from './score.service';
import {UserService} from '../user/user.service';
import {Router}  from '@angular/router';


@Component({
    selector: 'game',
    templateUrl: 'app/game/game.component.html',
    styleUrls: ['app/game/game.component.css'],
    providers: [GameService, ShuffleService]
})
export class GameComponent implements OnInit {
  streams: any = [];
  question = {};
  incorrect: boolean = false;
  quadrantIndex =0;
  shrinkCount=0;
  currentQuadrant= null;
  quadrantArray = ['topLeftQuadrant', 'topRightQuadrant', 'bottomRightQuadrant', 'bottomLeftQuadrant'];
  blockGuess = false;
  currentQuestionSummary = this.initCurrenQuestionSummary();

  constructor(private _gameService: GameService,
          private el: ElementRef,
          private _shuffle: ShuffleService,
          private _scoreService: ScoreService,
          private _userService: UserService,
        private router: Router) {}

//Angular event listener that will fire the HTTP call for the twitch API via the GameService
  ngOnInit() {
     let name = this._userService.getUserName();
     if(!name) {
       this.router.navigate(['/home']);
     }
     this._scoreService.clear();
      this.loadQuestions(true);

  }

private initCurrenQuestionSummary() {
  return {
    incorrect: 0,
    name: ''
  }
}

//loads questions either on init or on correct answer
  private loadQuestions(shuffle:boolean) {
      this._gameService.getStreams().subscribe(streams => this.handleStreams(streams), error => console.log(error));
      if(shuffle) {
        this.quadrantArray = this._shuffle.shuffle(this.quadrantArray);
      }
      this.currentQuestionSummary = this.initCurrenQuestionSummary();

  }

//success function for retrieving games list, we retrieve 50 and randomize what we use from there
  private handleStreams(streams : String []) {
    this.streams = this._gameService.getSubsetOfResults(streams);
   this.question = this._gameService.formatQuestion(this.streams);
   let q: any = this.question;
   this.currentQuestionSummary.name = q.name;
   if(this.currentQuadrant === null){
     this.currentQuadrant = this.el.nativeElement.getElementsByClassName(this.quadrantArray[this.quadrantIndex])[0];
   }
   this.startTimer();
  }

//We have injected the element reference so that we can manipulate the elements opacity. Using the DOM becuase when using bindings
//by the time the lifecycle execute you were missing most of the transition
  private startTimer(){
    setTimeout(function(){
      if(this.shrinkCount !== 5 && this.currentQuadrant !== undefined) {
        this.currentQuadrant.style.opacity = this.currentQuadrant.style.opacity - .2;
        this.shrinkCount++;
      } else {
        this.shrinkCount = 0;
        this.quadrantIndex++;
        this.currentQuadrant = this.el.nativeElement.getElementsByClassName(this.quadrantArray[this.quadrantIndex])[0];

      }
      if(this.quadrantIndex < 4){
        this.startTimer();
      } else {
        this.timesUpProcess();
      }
    }.bind(this), 2000);
  }

//On answer verify if it is correct
  verifyAnswer(choice) {
    let answer =choice;
    if(!answer.correct){
      this.incorrect = true;
      this.blockGuess = true;
      this.currentQuestionSummary.incorrect +=1;
      setTimeout(function(){
        this.blockGuess = false;
      }.bind(this), 2000);
      this._scoreService.incorrectAnswer();
    } else {
      this._scoreService.addSummary(this.currentQuestionSummary);
      this.incorrect = false;
      this._scoreService.correctAnswer(this.quadrantIndex);
      this.loadQuestions(false);
    }
  }

private timesUpProcess() {
  this.router.navigate(['/review']);
}

}
