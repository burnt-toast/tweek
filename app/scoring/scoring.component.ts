import {  Component, OnInit, Input, EventEmitter, OnChanges } from '@angular/core'
import {NgClass} from '@angular/common';


@Component({
    selector: 'scoring',
    templateUrl: 'app/scoring/scoring.component.html',
    styleUrls: ['app/scoring/scoring.css'],
    directives: [NgClass]
})
export class ScoringComponent implements OnInit, OnChanges {

    @Input() questionsAnswered: number;
    @Input() maxQuestions: number;
    questions: boolean[] = []

    width: number = 52;
    heigth: number = 52;
    url: string = '/assets/tweek_pic.png'

    reset(): void {
        this.questions = [];
        for (var index = 0; index < this.maxQuestions; index++) {
            this.questions[index] = false;
        }
    }

    ngOnInit() {
        this.reset();
    }

    ngOnChanges(changes) {
        if ("questionsAnswered" in changes) {
            let index = changes.questionsAnswered.previousValue;
            this.questions[index] = true;
            if (changes.questionsAnswered.currentValue == 0) {
                this.reset();
            }
        }
        console.log(changes);
    }
}