interface Box<T> {
    inside: T;
}

let stringBox: Box<string> = {
    inside: "abc",
};

let numberBox: Box<number> = {
    inside: 123,
};

let incorrectBox: Box<number> = {
    inside: false,
    // Error: Type 'boolean' is not assignable to type 'number'.
};
