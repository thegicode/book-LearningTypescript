"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Quote = /** @class */ (function () {
    function Quote(lines) {
        this.lines = lines;
    }
    return Quote;
}());
var SpokenQuote = /** @class */ (function (_super) {
    __extends(SpokenQuote, _super);
    function SpokenQuote() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpokenQuote.prototype.speak = function () {
        console.log(this.lines.join("\n"));
    };
    return SpokenQuote;
}(Quote));
var a = new Quote("The only real faiure is the failure to try.").lines; // type: string
console.log(a);
// Log: The only real faiure is the failure to try.
var b = new Quote([4, 8, 15, 16, 25, 42]).lines; // type: number[]
console.log(b);
// Log: [ 4, 8, 15, 16, 25, 42 ]
var c = new SpokenQuote(["Good is so descructive", "It destroys everything"])
    .lines;
console.log(c);
// Log: [ 'Good is so descructive', 'It destroys everything' ]
var d = new SpokenQuote([4, 8, 15, 16, 25, 42]);
// Error: Type 'number' is not assignable to type 'string'.
console.log(d);
// Log: SpokenQuote { lines: [ 4, 8, 15, 16, 25, 42 ] }
exports.default = Quote;
