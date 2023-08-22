"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Question {
    static answer;
    static prompt = "What's an ogre's favorite programing language?";
    geuss(getAnswer) {
        const answer = getAnswer(Question.prompt);
        if (answer === Question.answer) {
            console.log("You got is!");
        }
        else {
            console.log("Try again...");
        }
    }
}
Question.answer;
