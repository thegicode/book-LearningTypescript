function singTwo(first, second) {
    console.log("".concat(first, " / ").concat(second));
}
singTwo("Ball and Chain");
// Error : Expected 2 arguments, but got 1.
// Logs : Ball and Chain / undefined
singTwo("I Will Surive", "Higher Love");
// Logs : I Will Surive / Higher Love
singTwo("Go Your Own Way", "The Chain", "Dreams");
// Error : Expected 2 arguments, but got 3.
