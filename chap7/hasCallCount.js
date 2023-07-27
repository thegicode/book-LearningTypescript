var hasCallCount;
function keepsTrackOfCalls() {
    keepsTrackOfCalls.count += 1;
    console.log("I've been called ".concat(keepsTrackOfCalls.count, " times!"));
}
keepsTrackOfCalls.count = 0;
hasCallCount = keepsTrackOfCalls;
function doesNoHaveCount() {
    console.log("No idea!");
}
hasCallCount = doesNoHaveCount;
