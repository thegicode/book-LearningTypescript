var SchoolBus = /** @class */ (function () {
    function SchoolBus() {
    }
    SchoolBus.prototype.getAbilities = function () {
        return ["magic", "shapeshifting"];
    };
    return SchoolBus;
}());
function withSchoolBus(bus) {
    console.log(bus.getAbilities());
}
withSchoolBus(new SchoolBus()); // Ok
// Ok
withSchoolBus({
    getAbilities: function () { return ["transmogrification"]; },
});
withSchoolBus({
    getAbilities: function () { return 123; },
    // Error : Type 'number' is not assignable to type 'string[]'.
});
