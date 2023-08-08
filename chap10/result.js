function handleResult(result) {
    if (result.successed) {
        // result: SuccessfullResult<string>의 타입
        console.log("We did it! ".concat(result.data));
    }
    else {
        // result: FailureResult의 타입
        console.error("Awww... ".concat(result.error));
    }
    result.data;
}
