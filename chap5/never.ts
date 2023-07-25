function fail(message: string): never {
    throw new Error(`Invariant failure: ${message}`);
}

function workWithUnsafeParam(param: unknown) {
    if (typeof param !== "string") {
        fail(`param should be a string, not ${typeof param}`);
    }

    // 여기에서 param의 타입은 string으로 알려진다.
    param.toUpperCase();
}

workWithUnsafeParam(123);
