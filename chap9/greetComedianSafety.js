function greetComedianSafety(name) {
    if (typeof name === "string") {
        console.log("Announcing ".concat(name.toUpperCase()));
    }
    else {
        console.log("Well, I'm off");
    }
}
greetComedianSafety("Betty White");
greetComedianSafety({});
