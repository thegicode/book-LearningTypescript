type CreatesValue<Input, Output> = (input: Input) => Output;

// type: (input: string) => number
let creater: CreatesValue<string, number>;

creater = (text) => text.length; // Ok

creater = (text) => text.toUpperCase();
// Error: Type 'string' is not assignable to type 'number'.

export {};
