"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Lesson {
    subject;
    constructor(subject) {
        this.subject = subject;
    }
}
class OnlineLesson extends Lesson {
    url;
    constructor(subject, url) {
        super(subject);
        this.url = url;
    }
}
let lesson;
lesson = new Lesson("coding");
lesson = new OnlineLesson("coding", "orelly.com");
let online;
online = new OnlineLesson("coding", "orelly.com");
online = new Lesson("coding");
