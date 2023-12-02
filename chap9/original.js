const original = {
    medium: "movie",
    title: "Mean Girls",
};
let adaptation;
if (Math.random() > 0.5) {
    adaptation = { ...original, medium: "play" }; // Ok
}
else {
    adaptation = { ...original, medium: 2 };
    // Error: Type 'number' is not assignable to type 'string'.
}
export {};
