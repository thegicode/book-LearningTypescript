function handleResult(result) {
    if (result.succeeded === true) {
        // TypeScript now knows that result is SuccessfulResult<string>
        console.log("We did it! ".concat(result.data));
    }
    else {
        // TypeScript now knows that result is FailureResult
        console.error("Awww... ".concat(result.error));
    }
}
