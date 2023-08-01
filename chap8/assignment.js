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
var Assignment = /** @class */ (function () {
    function Assignment() {
    }
    return Assignment;
}());
var GradesAssignment = /** @class */ (function (_super) {
    __extends(GradesAssignment, _super);
    function GradesAssignment(grade) {
        var _this = _super.call(this) || this;
        _this.grade = grade;
        return _this;
    }
    return GradesAssignment;
}(Assignment));
