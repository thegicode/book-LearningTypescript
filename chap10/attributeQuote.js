import Quote from "./quote";
class AttributeQuote extends Quote {
    speaker;
    constructor(value, speaker) {
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
