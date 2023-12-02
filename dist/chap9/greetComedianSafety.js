function greetComedianSafety(name) {
    if (typeof name === "string") {
        console.log(`Announcing ${name.toUpperCase()}`); // Ok
    }
    else {
        console.log("Well, I'm off");
    }
}
greetComedianSafety("Betty White");
// Logs: Announcing BETTY WHITE
greetComedianSafety({});
export {};
