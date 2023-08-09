interface WithLength {
    length: number;
}

function logWithLength<T extends WithLength>(input: T) {
    console.log(`Length: ${input.length}`);
    return input;
}

logWithLength("No one can figure out your worth but you."); // type: string
logWithLength([false, true]); // type: boolean[]
logWithLength({ length: 123 }); // type: { length: number }

logWithLength(new Date());
// Error: Argument of type 'Date' is not assignable to parameter of type 'WithLength'.
//   Property 'length' is missing in type 'Date' but required in type 'WithLength'.

export {};
