interface Writing {
    title: string;
}

interface Novella extends Writing {
    pages: number;
}

let myNovella: Novella = {
    pages: 195,
    title: "Ethan Frome",
};

let missingPage: Novella = {
    // Error : Property 'pages' is missing in type '{ title: string; }' but required in type 'Novella'.
    title: "The Awakening",
};

let extraProperty: Novella = {
    page: 300,
    // Error :  Type '{ page: number; strategy: string; style: string; }' is not assignable to type 'Novella'.
    strategy: "baseline",
    style: "Naturalism",
};

export {};
