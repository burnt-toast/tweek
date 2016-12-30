import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ScoreService{
  score = 0;
  summary = [];

//Dedecut points for incorrect guess
  incorrectAnswer() {
    this.score = this.score - 2;
  }

  //determine score based on how many seconds were remaining for that questions
  correctAnswer(quadrantsRevealed) {
    if(quadrantsRevealed === 1){
      this.score = this.score + 10;
    } else if(quadrantsRevealed === 2){
      this.score = this.score + 8;
    } else if(quadrantsRevealed === 3){
      this.score = this.score +6;
    } else if(quadrantsRevealed === 4){
      this.score = this.score + 4;
    }
  }

  getSummary() {
    return this.summary;
  }

  clear() {
    this.score =0;
    this.summary = [];
  }

  addSummary(summary) {
    this.summary.push(summary);
  }
  getScore() {
    return this.score;
  }

}
