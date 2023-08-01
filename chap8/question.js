"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Question = /** @class */ (function () {
    function Question() {
    }
    Question.prototype.geuss = function (getAnswer) {
        var answer = getAnswer(Question.prompt);
        if (answer === Question.answer) {
            console.log("You got is!");
        }
        else {
            console.log("Try again...");
        }
    };
    Question.prompt = "What's an ogre's favorite programing language?";
    return Question;
}());
Question.answer;
