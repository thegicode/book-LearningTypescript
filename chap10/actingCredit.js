var MoviePart = /** @class */ (function () {
    function MoviePart(role, speaking) {
        this.role = role;
        this.speaking = speaking;
    }
    return MoviePart;
}());
var part = new MoviePart("Miranda Priestly", true);
var a = part.role; // type: string
console.log(a); // Log:  Miranda Priestly
var IncorrectExtension = /** @class */ (function () {
    function IncorrectExtension() {
    }
    return IncorrectExtension;
}());
