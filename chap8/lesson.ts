class Lesson {
    subject: string;

    constructor(subject: string) {
        this.subject = subject;
    }
}

class OnlineLesson extends Lesson {
    url: string;

    constructor(subject: string, url: string) {
        super(subject);
        this.url = url;
    }
}

let lesson: Lesson;
lesson = new Lesson("coding");
lesson = new OnlineLesson("coding", "orelly.com");

let online: OnlineLesson;
online = new OnlineLesson("coding", "orelly.com");

online = new Lesson("coding");
// Error: Property 'url' is missing in type 'Lesson' but required in type 'OnlineLesson'.

export {};
