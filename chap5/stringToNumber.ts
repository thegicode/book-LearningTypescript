type StringToNumber = (input: string) => number;

let stringToNumber: StringToNumber;

stringToNumber = (input) => input.length;

stringToNumber = (input) => input.toUpperCase();
// Error : Type 'string' is not assignable to type 'number'.
