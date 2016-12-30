export class Question {

    constructor(
        public correctAnswerIndex: number,
        public text: string,
        public choices: string[],
        public url: string
    ) { }

    getAnswer(): string {
        return this.choices[this.correctAnswerIndex];
    }
}

export class AnswerResults {
    constructor(public question: Question, public yourAnswer: string, public answeredCorrect: boolean) { }
}