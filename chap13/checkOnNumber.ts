function checkOnNumber(containsA: (input: number | string) => boolean) {
    return containsA(1337);
}

function stringContainsA(input: string) {
    return !!input.match(/a/i);
}

checkOnNumber(stringContainsA);
// Argument of type '(input: string) => boolean' is not assignable to parameter of type '(input: string | number) => boolean'.
//   Types of parameters 'input' and 'input' are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.
