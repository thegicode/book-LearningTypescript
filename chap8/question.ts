class Question {
    protected static readonly answer: "bash";
    protected static readonly prompt =
        "What's an ogre's favorite programing language?";

    geuss(getAnswer: (prompt: string) => string) {
        const answer = getAnswer(Question.prompt);

        if (answer === Question.answer) {
            console.log("You got is!");
        } else {
            console.log("Try again...");
        }
    }
}

Question.answer;
// Error: Property 'answer' is protected and only accessible within class 'Question' and its subclasses.

export {};
