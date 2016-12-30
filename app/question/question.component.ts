import { OnInit, Component, Output, EventEmitter } from '@angular/core';
import { Question, AnswerResults } from './question';
import { QuestionService} from './question.service';

@Component({
    selector: "question",
    templateUrl: 'app/question/question.component.html'
})
export class QuestionComponent implements OnInit {
    question: Question;
    selectedAnswer: string;
    message: string;

    constructor(private qService : QuestionService){ }

    ngOnInit(): void {
        this.getNewQuestion();
    }

    submitAnswer() {
        let results = this.question.getAnswer() == this.selectedAnswer;
        this.message = 'You answered : ' + results;
        let ar = new AnswerResults(this.question, this.selectedAnswer, results );
        console.log("publishing ar: " + ar);
        this.answerResultsClicked.emit(ar);
        this.getNewQuestion();
    }
    
    @Output() answerResultsClicked : EventEmitter<AnswerResults> = new EventEmitter<AnswerResults>();
    @Output() questionPublished : EventEmitter<Question> = new EventEmitter<Question>();

    getNewQuestion() {
        var q = this.qService.getNextQuestion();
        this.questionPublished.emit(q);
        console.log("publishing q: " + q);
        this.question = q;
    }
}