function handleResult(result) {
    if (result.successed) {
        // result: SuccessfullResult<string>의 타입
        console.log(`We did it! ${result.data}`);
    }
    else {
        // result: FailureResult의 타입
        console.error(`Awww... ${result.error}`);
        // Error: Property 'error' does not exist on type 'Result<string>'.
        //   Property 'error' does not exist on type 'SuccessfullResult<string>'.
        // 책에서는 이 에러에 대한 언급이 없음.
    }
    result.data;
    // Error:  Property 'data' does not exist on type 'Result<string>'.
    //   Property 'data' does not exist on type 'FailureResult'.
}
export {};
