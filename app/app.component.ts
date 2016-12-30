import {Component } from '@angular/core';
import { ScoresComponent } from './scores/scores.component';
import { ScoresService } from './scores/scores.service';
import {HomeComponent} from './home/home.component';
import {GameComponent} from './game/game.component';
import {UserService} from './user/user.service';
import {ScoreService} from './game/score.service';
import {ReviewComponent} from './review/review.component';
import { QuestionComponent } from './question/question.component'
import { PluginComponent } from './plugin/plugin.component'
import { QuestionService } from './question/question.service'
import { PlaygroundComponent } from './playground/playground.component'
import { ScoringDetailComponent } from './scoring/scoring-detail.component'
import { ROUTER_DIRECTIVES, Routes, ROUTER_PROVIDERS } from '@angular/router';
import { ScoringDetailsService } from './scoring/scoring-detail.services'
import { TwitchService, TwitchCacheService } from './twitch/twitch.service'


@Component({
    selector: 'tweek',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES, ScoresComponent],
    providers: [ScoresService, UserService, QuestionService, ScoringDetailsService, TwitchService, TwitchCacheService]
})
@Routes([
    {
        path: '/topscores',
        component: ScoresComponent
    },
    {
        path: '/home',
        component: HomeComponent,
    },
    {
        path: '/',
        component: HomeComponent,
    },
    {
        path: '/game',
        component: GameComponent
    },
    {
        path: '/questionTest',
        component: QuestionComponent
    },
    {
        path: '/game',
        component: GameComponent
    },
    {
        path: 'review',
        component: ReviewComponent
    },
    {
        path: '/plugin',
        component: PluginComponent
    },
    {
        path: '/playground',
        component: PlaygroundComponent
    },
    {
        path: '/scoreDetails',
        component: ScoringDetailComponent
    },
])
export class AppComponent {
    title = 'Do you even tweek? - Yes we do';



}
