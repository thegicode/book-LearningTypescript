class Quote {
    readonly text: string;

    constructor(text: string) {
        this.text = text;
    }

    emphaisze() {
        this.text += "!";
        // Error : Cannot assign to 'text' because it is a read-only property.
    }
}

const quote = new Quote(
    "There is a brilliant child locked inside every stdent."
);
quote.text = "Hai";
// Error : Cannot assign to 'text' because it is a read-only property.

export {};
