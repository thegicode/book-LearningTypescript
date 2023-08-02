function greetComedianSafety(name: unknown) {
    if (typeof name === "string") {
        console.log(`Announcing ${name.toUpperCase()}`); // Ok
    } else {
        console.log("Well, I'm off");
    }
}

greetComedianSafety("Betty White");
// Logs: Announcing BETTY WHITE
greetComedianSafety({});
// Logs: Well, I'm off

export {};
