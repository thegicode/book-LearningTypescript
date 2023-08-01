class ActivitiesQueue {
    pending!: string[]; // Ok

    initialize(pending: string[]) {
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
