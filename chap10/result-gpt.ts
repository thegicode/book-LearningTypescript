type Result<Data> = FailureResult | SuccessfulResult<Data>;

interface FailureResult {
    error: Error;
    succeeded: false;
}

interface SuccessfulResult<Data> {
    data: Data;
    succeeded: true;
}

function handleResult(result: Result<string>) {
    if (result.succeeded === true) {
        // TypeScript now knows that result is SuccessfulResult<string>
        console.log(`We did it! ${result.data}`);
    } else {
        // TypeScript now knows that result is FailureResult
        console.error(`Awww... ${result.error}`);
    }
}
