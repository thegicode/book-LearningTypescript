function logWithLength(input) {
    console.log("Length: ".concat(input.length));
    return input;
}
logWithLength("No one can figure out your worth but you."); // type: string
logWithLength([false, true]); // type: boolean[]
logWithLength({ length: 123 }); // type: { length: number }
logWithLength(new Date());
