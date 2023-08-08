class CurriedCallback<Input> {
    #callback: (input: Input) => void;
    // Error: Private identifiers are only available when targeting ECMAScript 2015 and higher.
    // 설정을 바꿔봤으나 해결이 안된다.

    constructor(callback: (input: Input) => void) {
        this.#callback = (input: Input) => {
            console.log("Input", input);
            callback(input);
        };
    }
}

new CurriedCallback((input: string) => {
    console.log(input.length);
});

new CurriedCallback((input) => {
    console.log(input.length);
    // Error: Property 'length' does not exist on type 'unknown'.
});

export { CurriedCallback };
