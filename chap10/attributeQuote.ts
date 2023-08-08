import Quote from "./quote";

class AttributeQuote<Value> extends Quote<Value> {
    speaker: string;

    constructor(value: Value, speaker: string) {
        super(value);
        this.speaker = speaker;
    }
}

// type: AttirbuteQuote<string>
// (Quote<string> 확장하기)
const a = new AttributeQuote(
    "The road to success is always under construction.",
    "Lily tomlin"
);

console.log("attributeQuote", a);
// Log :
// AttributeQuote {
//   lines: 'The road to success is always under construction.',
//   speaker: 'Lily tomlin'
// }

export {};
