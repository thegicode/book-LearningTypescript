interface WithNullableName {
    name: string | null;
}

interface WithNonNullableName extends WithNullableName {
    name: string;
}

interface withNumericName extends WithNullableName {
    // Error : Interface 'withNumericName' incorrectly extends interface 'WithNullableName
    // Types of property 'name' are incompatible.
    //  Type 'string | number' is not assignable to type 'string'.
    //   Type 'number' is not assignable to type 'string'.
    name: number | string;
}

export {};
