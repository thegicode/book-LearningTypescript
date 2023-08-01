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
var NumericGrade = /** @class */ (function () {
    function NumericGrade() {
        this.value = 0;
    }
    return NumericGrade;
}());
var ValueGrade = /** @class */ (function (_super) {
    __extends(ValueGrade, _super);
    function ValueGrade() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = Math.random() > 0.5 ? 1 : "...";
        return _this;
    }
    return ValueGrade;
}(NumericGrade));
var instance = new ValueGrade();
// 에상 타입:  number
// 실제 타입: number | string
instance.value;
