interface Quote<T = string> {
    value: T;
}

let expicit: Quote<number> = { value: 123 };

let implicit: Quote = { value: "Be your slef" };

let mismatch: Quote = { value: 123 };
// Error: Type 'number' is not assignable to type 'string'.

export {};
