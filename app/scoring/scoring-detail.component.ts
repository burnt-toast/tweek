import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AnswerResults } from '../question/question'
import { ScoringDetailsService } from '../scoring/scoring-detail.services'
import { ScoresService } from '../scores/scores.service'
import { Response } from '@angular/http'

@Component({
    selector: 'scoring-detail',
    templateUrl: 'app/scoring/scoring-detail.component.html'
})
export class ScoringDetailComponent {

    ar: AnswerResults[]
    totalScoreMessage: string;

    constructor(private _router: Router, private scoringDetailsService: ScoringDetailsService, private scoresService: ScoresService) {
        this.ar = scoringDetailsService.getAnswerResults();
        this.totalScoreMessage = this.scoringDetailsService.getTotalScoreFormated();
    }

    onBack(): void {
        this._router.navigate(['playground']);
    }

    submitScore(): void {
        this.scoresService.postScore({
            user : "testuser" + Math.random(),
            score : this.scoringDetailsService.getTotalScore()
        }).subscribe((response: Response) => {
            console.log(response);
            this._router.navigate(['topscores']);
        });
    }
}
