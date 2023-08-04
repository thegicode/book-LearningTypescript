function logWrapper<Input>(callback: (input: Input) => void) {
    return (input: Input) => {
        console.log("Input: ", input);
        callback(input);
    };
}

// type: (input: string) => void
logWrapper((input: string) => {
    console.log(input.length);
});

// type: (input: unknown) => void
logWrapper((input) => {
    console.log(input.length);
    // Error: Property 'length' does not exist on type 'unknown'.
});

// type: (input: string) => void
logWrapper<string>((input) => {
    console.log(input.length);
});

logWrapper<string>((input: boolean) => {
    // Error : Argument of type '(input: boolean) => void' is not assignable to parameter of type '(input: string) => void'.
    //   Types of parameters 'input' and 'input' are incompatible.
    //   Type 'string' is not assignable to type 'boolean'.
});

logWrapper<string>((input: string) => {
    //
});

export {};
