class CurriedCallback {
    #callback;
    // Error: Private identifiers are only available when targeting ECMAScript 2015 and higher.
    // 설정을 바꿔봤으나 해결이 안된다.
    constructor(callback) {
        this.#callback = (input) => {
            console.log("Input", input);
            callback(input);
        };
    }
}
new CurriedCallback((input) => {
    console.log(input.length);
});
new CurriedCallback((input) => {
    console.log(input.length);
    // Error: Property 'length' does not exist on type 'unknown'.
});
export { CurriedCallback };
