var Quote = /** @class */ (function () {
    function Quote(text) {
        this.text = text;
    }
    Quote.prototype.emphaisze = function () {
        this.text += "!";
    };
    return Quote;
}());
var quote = new Quote("There is a brilliant child locked inside every stdent.");
quote.text = "Hai";
