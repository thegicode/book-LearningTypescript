type Poet = {
    born: number;
    name: string;
};

const peetMatch: Poet = {
    born: 1928,
    name: "Maya Angelou",
};

const extraProperty: Poet = {
    activity: "walking",
    // Error: Type '{ activity: string; born: number; name: string; }' is not assignable to type 'Poet'.
    // Object literal may only specify known properties, and 'activity' does not exist in type 'Poet'.
    born: 1935,
    name: "Mary Oliver",
};

export {};
