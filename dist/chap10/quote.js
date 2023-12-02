class Quote {
    lines;
    constructor(lines) {
        this.lines = lines;
    }
}
class SpokenQuote extends Quote {
    speak() {
        console.log(this.lines.join("\n"));
    }
}
const a = new Quote("The only real faiure is the failure to try.").lines; // type: string
console.log(a);
// Log: The only real faiure is the failure to try.
const b = new Quote([4, 8, 15, 16, 25, 42]).lines; // type: number[]
console.log(b);
// Log: [ 4, 8, 15, 16, 25, 42 ]
const c = new SpokenQuote(["Good is so descructive", "It destroys everything"])
    .lines;
console.log(c);
// Log: [ 'Good is so descructive', 'It destroys everything' ]
const d = new SpokenQuote([4, 8, 15, 16, 25, 42]);
// Error: Type 'number' is not assignable to type 'string'.
console.log(d);
// Log: SpokenQuote { lines: [ 4, 8, 15, 16, 25, 42 ] }
export default Quote;
