import { Component, OnInit } from '@angular/core';
import { QuestionComponent } from '../question/question.component'
import { PluginComponent } from '../plugin/plugin.component'
import { ScoringComponent } from '../scoring/scoring.component'
import { AnswerResults, Question } from '../question/question'
import { Router } from '@angular/router';
import { ScoringDetailComponent } from '../scoring/scoring-detail.component'
import { ScoringDetailsService } from '../scoring/scoring-detail.services'
import { TwitchCacheService } from '../twitch/twitch.service'

@Component({
    selector: 'playground',
    templateUrl: 'app/playground/playground.component.html',
    directives: [QuestionComponent,
        PluginComponent,
        ScoringComponent],
    providers: []
})
export class PlaygroundComponent implements OnInit {
    history: AnswerResults[];
    currentQuestion: number;
    maxQuestions: number;
    currentChannel: string = 'http://player.twitch.tv/?channel=neshapotamus'

    constructor(private router: Router, private scoringDetailsService: ScoringDetailsService, private twitch : TwitchCacheService) { }

    answerRecieved(ar: AnswerResults): void {
        this.history.push(ar);
        //console.log("added to ar");
        this.currentQuestion++;

        if (this.currentQuestion >= this.maxQuestions) {
            this.scoringDetailsService.setAnswerResults(this.history);
            this.router.navigate(['scoreDetails'])
            this.reset();
        }
        //update score
    }
    
    questionRecieved(q: Question) : void {
        this.currentChannel = 'http://player.twitch.tv/?channel=' + q.url;
    }

    reset(): void {
        this.currentQuestion = 0;
        this.maxQuestions = 4;
        this.history = []
    }

    ngOnInit(): void {
        this.reset();
    }
}