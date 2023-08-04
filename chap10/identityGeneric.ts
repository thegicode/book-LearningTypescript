function identityGeneric<T>(input: T) {
    return input;
}

const numeric = identityGeneric("me"); // type: "me"
const stringy = identityGeneric(123); // type: 123

const identityArrow = <T>(input: T) => input;

identityArrow(123); // type: 123

export {};
