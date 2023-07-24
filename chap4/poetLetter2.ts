type Poet = {
    born: number;
    name: string;
};

let poetLatter2: Poet;

poetLatter2 = {
    born: 1935,
    name: "Mary Oliver",
};

poetLatter2 = "Sappho";
// Error : Type 'string' is not assignable to type 'Poet'.

export {};
