type Result<Data> = FailureResult | SuccessfullResult<Data>;

interface FailureResult {
    error: Error;
    successed: false;
}

interface SuccessfullResult<Data> {
    data: Data;
    successed: true;
}

function isSuccessfullResult<Data>(
    result: Result<Data>
): result is SuccessfullResult<Data> {
    return result.successed;
}

function handleResult(result: Result<string>) {
    if (isSuccessfullResult(result)) {
        console.log(`We did it! ${result.data}`);
    } else {
        console.error(`Awww... ${result.error}`);
    }

    // 이 시점에서 'result.data'에 접근하려 하면 여전히 오류가 발생합니다.
}

export {};
