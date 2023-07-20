let researcher = Math.random() > 0.5 ? "Rosalind Franklin" : 51;

if (typeof researcher === "string") {
    researcher.toUpperCase();
}

if (!(typeof researcher === "string")) {
    researcher.toFixed();
} else {
    researcher.toUpperCase();
}

typeof researcher === "string"
    ? researcher.toUpperCase()
    : researcher.toFixed();
