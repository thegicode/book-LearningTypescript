class Question {
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
Question.prompt = "What's an ogre's favorite programing language?";
Question.answer;
export {};
