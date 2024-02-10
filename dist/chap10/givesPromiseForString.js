async function givesPromiseForString() {
    return "Done!";
}
async function giveString() {
    // Error: Type 'string' is not a valid async function return type in ES5/ES3 because it does not refer to a Promise-compatible constructor value.
    return "Done!";
}
export {};
