"use strict";
function handleResult(result) {
    if (result.succeeded === true) {
        // TypeScript now knows that result is SuccessfulResult<string>
        console.log(`We did it! ${result.data}`);
    }
    else {
        // TypeScript now knows that result is FailureResult
        console.error(`Awww... ${result.error}`);
    }
}
