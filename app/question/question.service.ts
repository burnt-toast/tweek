import {Injectable } from '@angular/core'
import {Question} from './Question'
import { TwitchCacheService } from '../twitch/twitch.service'

@Injectable()
export class QuestionService {
    private questions: Question[] = Q_TEST.slice();
    
    constructor(private twitch : TwitchCacheService){
        
    }

    private getQuestions(): Question[] {
        //update code here to get questions from actual twith server, this will catch the code
        if (this.questions.length == 0) {
            this.questions =  this.twitch.getRandomQuestions();
        }
        return this.questions;
    }

    getNextQuestion(): Question {
        let index = this.getRandomInt(0, this.getQuestions().length);
        var q = this.getQuestions()[index];
        this.questions.splice(index);
        return q;
    }

    private getRandomInt(min, max): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

let Q_TEST = [
    new Question(0, 'What is divisible by 2?', ['10', '7', '13', '15'], 'http://player.twitch.tv/?channel=neshapotamus'),
    // new Question(1, 'Who is from IMS?', ['Nesh', 'Evan', 'John', 'Jake']),
    // new Question(2, 'Who is from Retail?', ['Nesh', 'Evan', 'John', 'Jake']),
    // new Question(3, 'Who is Institutional?', ['Nesh', 'Evan', 'John', 'Jake']),
]