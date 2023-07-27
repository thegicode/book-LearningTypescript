interface FunctionWithCount {
    count: number;
    (): void;
}

let hasCallCount: FunctionWithCount;

function keepsTrackOfCalls() {
    keepsTrackOfCalls.count += 1;
    console.log(`I've been called ${keepsTrackOfCalls.count} times!`);
}

keepsTrackOfCalls.count = 0;

hasCallCount = keepsTrackOfCalls;

function doesNoHaveCount() {
    console.log("No idea!");
}

hasCallCount = doesNoHaveCount;
// Error : Property 'count' is missing in type '() => void' but required in type 'FunctionWithCount'.
