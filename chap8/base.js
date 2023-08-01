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
var _Base_truePrivate;
var Base = /** @class */ (function () {
    function Base() {
        this.isPublicExplicit = 1;
        this.isProtected = 2;
        this.isPrivate = 3;
        _Base_truePrivate.set(this, 4);
    }
    return Base;
}());
_Base_truePrivate = new WeakMap();
var SubClass = /** @class */ (function (_super) {
    __extends(SubClass, _super);
    function SubClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubClass.prototype.examples = function () {
        this.isPublicImpicit;
        this.isPublicExplicit;
        this.isProtected;
        this.isPrivate;
        this.;
    };
    return SubClass;
}(Base));
new SubClass().isPublicImpicit;
new SubClass().isPublicExplicit;
new SubClass().isProtected;
new SubClass().isPrivate;
