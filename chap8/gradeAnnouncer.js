"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GradeAnnouncer {
    message;
    constructor(grade) {
        this.message = grade >= 65 ? "Maybe next time..." : "You pass!";
    }
}
class PassingAnnouncer extends GradeAnnouncer {
    constructor() {
        super(100);
    }
}
class FailingAnnouncer extends GradeAnnouncer {
    constructor() { }
}
