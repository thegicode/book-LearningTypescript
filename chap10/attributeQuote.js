"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const quote_1 = __importDefault(require("./quote"));
class AttributeQuote extends quote_1.default {
    constructor(value, speaker) {
        super(value);
        this.speaker = speaker;
    }
}
// type: AttirbuteQuote<string>
// (Quote<string> 확장하기)
const a = new AttributeQuote("The road to success is always under construction.", "Lily tomlin");
console.log("attributeQuote", a);
