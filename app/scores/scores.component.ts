import { Component, OnInit } from '@angular/core';
import { IScore } from './score'
import { ScoresService } from './scores.service'


@Component({
    selector: 'top-scores',
    templateUrl: 'app/scores/scores.component.html'
})
export class ScoresComponent implements OnInit {
    pageTitle: string = 'Top  Scores';
    scores: IScore[] = []

    constructor(private scoresService: ScoresService) { }

    ngOnInit(): void {
        this.scoresService.getScores()
            .subscribe((response: any) => this.scores = response);
    }
}


let SCORES = [
    { name: "Nesh", score: 123456.00 },
    { name: "Evan", score: 123456.00 },
    { name: "John", score: 123456.00 },
    { name: "Jake", score: 123456.00 },
]

