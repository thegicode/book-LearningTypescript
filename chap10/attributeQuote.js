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
var quote_1 = require("./quote");
var AttributeQuote = /** @class */ (function (_super) {
    __extends(AttributeQuote, _super);
    function AttributeQuote(value, speaker) {
        var _this = _super.call(this, value) || this;
        _this.speaker = speaker;
        return _this;
    }
    return AttributeQuote;
}(quote_1.default));
// type: AttirbuteQuote<string>
// (Quote<string> 확장하기)
var a = new AttributeQuote("The road to success is always under construction.", "Lily tomlin");
console.log("attributeQuote", a);
