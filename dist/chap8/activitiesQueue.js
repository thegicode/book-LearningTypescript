class ActivitiesQueue {
    pending; // Ok
    initialize(pending) {
        this.pending = pending;
    }
    next() {
        return this.pending.pop();
    }
}
const activities = new ActivitiesQueue();
activities.initialize(["eat", "sleep", "learn"]);
activities.next();
export {};
