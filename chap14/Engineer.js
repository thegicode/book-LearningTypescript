var Engineer = /** @class */ (function () {
    function Engineer(area) {
        this.area = area;
        console.log("I work in ther ".concat(area, " area"));
    }
    return Engineer;
}());
new Engineer("mechanical").area;
