type Poet = {
    born: number;
    name: string;
};

const existingObject = {
    activity: "walking",
    born: 1935,
    name: "Mary Oliver",
};

const extraPropertyButOk: Poet = existingObject; // Ok

export {};
