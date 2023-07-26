function logTrio(name, value) {
    console.log("".concat(name, " has ").concat(value[0], " ").concat(value[1], "}"));
}
var trios = [
    ["Amanitore", [1, true]],
    ["Theland", [2, false]],
    ["Ann e. Durwoody", [3, false]],
];
trios.forEach(function (trio) { return logTrio.apply(void 0, trio); });
trios.forEach(logTrio);
