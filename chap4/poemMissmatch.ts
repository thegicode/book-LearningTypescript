type Author = {
    firstName: string;
    lastName: string;
};

type Poem = {
    author: Author;
    name: string;
};

const poemMisttMatch: Poem = {
    author: {
        name: "sylvia Plath",
        // Error :  Type '{ name: string; }' is not assignable to type 'Author'.
        // Object literal may only specify known properties, and 'name' does not exist in type 'Author'.
    },
    name: "Tulips",
};

export {};
