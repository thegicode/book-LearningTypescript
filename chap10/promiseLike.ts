class PromiseLike<Value> {
    constructor(
        executor: (
            resolve: (value: Value) => void,
            reject: (reason: unknown) => void
        ) => void
    ) {
        //
    }
}

export {};
