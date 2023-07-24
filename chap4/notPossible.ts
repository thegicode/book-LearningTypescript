type NotPossible = number & string;

let notNumber: NotPossible = 0;
//  Type 'number' is not assignable to type 'never'.

let notString: never = "";
// Type 'string' is not assignable to type 'never'.

export {};
