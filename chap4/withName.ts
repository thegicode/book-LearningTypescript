type WithFirstName = {
    firstName: string;
};

type WithLastName = {
    lastName: string;
};

const hasBoth = {
    firstName: "Lucille",
    lastName: "Clifton",
};

let withFirstName: WithFirstName = hasBoth;
// Ok :  'hashBoth'는 'string' 타입의 'firstName'을 포함함

let withLastName: WithLastName = hasBoth;
// Ok :  'hashBoth'는 'string' 타입의 'lastName'을 포함함

export {};
