let myNovella = {
    pages: 195,
    title: "Ethan Frome",
};
let missingPage = {
    // Error : Property 'pages' is missing in type '{ title: string; }' but required in type 'Novella'.
    title: "The Awakening",
};
let extraProperty = {
    page: 300,
    // Error :  Type '{ page: number; strategy: string; style: string; }' is not assignable to type 'Novella'.
    strategy: "baseline",
    style: "Naturalism",
};
export {};
