interface Joke {
    quote: string;
    style: "story" | "one-liner";
}

function tellJoke(joke: Joke) {
    if (joke.style === "one-liner") {
        console.log(joke.quote);
    } else {
        console.log(joke.quote.split("\n"));
    }
}

// type: { quote: string; style: "one-liner"}
const narrowJoke = {
    quote: "If ypu staty alive for non other reasons do it for spite.",
    style: "one-liner" as const,
};

tellJoke(narrowJoke); // Ok

// type: { quote: string; style: string }
const wideObject = {
    quote: "Time files when you are anxious!",
    style: "one-liner",
};
tellJoke(wideObject);
// Error: Argument of type '{ quote: string; style: string; }' is not assignable to parameter of type 'Joke'.
//   Types of property 'style' are incompatible.
//   Type 'string' is not assignable to type '"story" | "one-liner"'.

export {};
