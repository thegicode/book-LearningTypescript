function logPair(name, value) {
    console.log("".concat(name, " is ").concat(value));
}
var pairArray = ["Amage", 1];
logPair.apply(void 0, pairArray);
var pairTupleIncorrect = [1, "Amage"];
logPair.apply(void 0, pairTupleIncorrect);
var pairTupleCorrect = ["Amage", 1];
logPair.apply(void 0, pairTupleCorrect);
