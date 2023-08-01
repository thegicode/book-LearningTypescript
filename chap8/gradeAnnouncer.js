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
var GradeAnnouncer = /** @class */ (function () {
    function GradeAnnouncer(grade) {
        this.message = grade >= 65 ? "Maybe next time..." : "You pass!";
    }
    return GradeAnnouncer;
}());
var PassingAnnouncer = /** @class */ (function (_super) {
    __extends(PassingAnnouncer, _super);
    function PassingAnnouncer() {
        return _super.call(this, 100) || this;
    }
    return PassingAnnouncer;
}(GradeAnnouncer));
var FailingAnnouncer = /** @class */ (function (_super) {
    __extends(FailingAnnouncer, _super);
    function FailingAnnouncer() {
        var _this = this;
        return _this;
    }
    return FailingAnnouncer;
}(GradeAnnouncer));
