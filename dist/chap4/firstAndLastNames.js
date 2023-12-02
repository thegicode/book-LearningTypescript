const hasBoth = {
    firstName: "Lucille",
    lastName: "Clifton",
};
const hasOnlyOne = {
    first: "Sappho",
    // Error : Type '{ first: string; }' is not assignable to type 'FirstAndLastNames'.
    // Object literal may only specify known properties, and 'first' does not exist in type 'FirstAndLastNames'.
};
export {};
