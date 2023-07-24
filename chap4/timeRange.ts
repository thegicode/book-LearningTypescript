type TimeRange = {
    start: Date;
};

const hasStartSTring: TimeRange = {
    start: "1879-02-13",
    // Error: Type 'string' is not assignable to type 'Date'.
};
