var CreatePairFacotory = /** @class */ (function () {
    function CreatePairFacotory(key) {
        this.key = key;
    }
    CreatePairFacotory.prototype.createPair = function (value) {
        return {
            key: this.key,
            value: value,
        };
    };
    return CreatePairFacotory;
}());
var facotry = new CreatePairFacotory("role");
// type: CreatePairFacotory<stirng>
console.log("facotry: ", facotry);
var numberPair = facotry.createPair(10);
// type: { key: string, value: number}
console.log("numberPair: ", numberPair);
var stringPair = facotry.createPair("Sophine");
// type: { key: string, value: string }
console.log("stringPair: ", stringPair);
