type NumberToStrong = (input: number) => string;

function usesNumberToString(numberToString: NumberToStrong) {
    console.log(`The string is : ${numberToString(1234)}`);
}

usesNumberToString((input) => `${input}! Hooray!`);

usesNumberToString((input) => input * 2);
// Error : Type 'number' is not assignable to type 'string'.
