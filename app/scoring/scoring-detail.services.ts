import { Injectable } from '@angular/core'
import { AnswerResults } from '../question/question'

@Injectable()
export class ScoringDetailsService {
    private _ar: AnswerResults[];
    setAnswerResults(ar: AnswerResults[]): void {
        this._ar = ar;
    }
    getAnswerResults(): AnswerResults[] {
        return this._ar;
    }

    getTotalScore(): number {
        let correct = 0;
        this._ar.forEach(x => { if (x.answeredCorrect) correct++ });
        return correct;
    }

    private getTotalQuestions() {
        return this._ar.length;
    }

    getTotalScoreFormated(): string {
        return this.getTotalScore() + '/' + this.getTotalQuestions();
    }
}