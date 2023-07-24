let poetLatter: {
    born: number;
    name: string;
};

poetLatter = {
    born: 1935,
    name: "Mary Oliver",
};

poetLatter = "Sappho";
// Error : Type 'string' is not assignable to type '{ born: number; name: string; }'.

export {};
