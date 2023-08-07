interface CreateLike<T> {
    contents: T;
}

let missingGeneric: CreateLike = {
    // Error: Generic type 'CreateLike<T>' requires 1 type argument(s).
    inside: "??",
};

export {};
