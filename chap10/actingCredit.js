"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MoviePart {
    constructor(role, speaking) {
        this.role = role;
        this.speaking = speaking;
    }
}
const part = new MoviePart("Miranda Priestly", true);
const a = part.role; // type: string
console.log(a); // Log:  Miranda Priestly
class IncorrectExtension {
}
