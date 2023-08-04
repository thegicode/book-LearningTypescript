interface Entertainer {
    acts: string[];
    name: string;
}

const declared: Entertainer = {
    // Error: Property 'acts' is missing in type '{ name: string; }' but required in type 'Entertainer'.
    name: "Moms Mabley",
};

const asserted = {
    name: "Moms Mabley",
} as Entertainer;

console.log(declared.acts.join(", "));
// Runtime TypeError: Cannot read properties of undefined (reading 'join')
console.log(asserted.acts.join(", "));

export {};
