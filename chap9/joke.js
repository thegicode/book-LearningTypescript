"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tellJoke(joke) {
    if (joke.style === "one-liner") {
        console.log(joke.quote);
    }
    else {
        console.log(joke.quote.split("\n"));
    }
}
// type: { quote: string; style: "one-liner"}
const narrowJoke = {
    quote: "If ypu staty alive for non other reasons do it for spite.",
    style: "one-liner",
};
tellJoke(narrowJoke); // Ok
// type: { quote: string; style: string }
const wideObject = {
    quote: "Time files when you are anxious!",
    style: "one-liner",
};
tellJoke(wideObject);
