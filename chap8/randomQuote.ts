class RandomQuote {
    readonly explicit: string = "Home is the nicest word there is";
    readonly implicit = "Home is the nicest word there is";

    constructor() {
        if (Math.random() > 0.5) {
            this.explicit = "We start learnig the minute we're born";
            this.implicit = "We start learnig the minute we're born";
            // Error : Type '"We start learnig the minute we're born"' is not assignable to type '"Home is the nicest word there is"'.
        }
    }
}

const quote = new RandomQuote();

console.log(quote.explicit); // 타입: string
console.log(quote.implicit); // 타입: "Home is the nicest word there is"

export {};
