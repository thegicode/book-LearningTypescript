var ActivitiesQueue = /** @class */ (function () {
    function ActivitiesQueue() {
    }
    ActivitiesQueue.prototype.initialize = function (pending) {
        this.pending = pending;
    };
    ActivitiesQueue.prototype.next = function () {
        return this.pending.pop();
    };
    return ActivitiesQueue;
}());
var activities = new ActivitiesQueue();
activities.initialize(["eat", "sleep", "learn"]);
activities.next();
