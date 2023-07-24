type Poem = {
    author: {
        firstName: string;
        lastName: string;
    };
    name: string;
};

const poemMatch: Poem = {
    author: {
        firstName: "Sylyvia",
        lastName: "Plath",
    },
    name: "Lady Lazarus",
};

const poemMissmatch: Poem = {
    author: {
        name: "Sylyvia Plath",
        // Error: Type '{ name: string; }' is not assignable to type '{ firstName: string; lastName: string; }'.
        // Object literal may only specify known properties, and 'name' does not exist in type '{ firstName: string; lastName: string; }'.
    },
    name: "Tullips",
};

export {};
