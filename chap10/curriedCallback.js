"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _CurriedCallback_callback;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurriedCallback = void 0;
var CurriedCallback = /** @class */ (function () {
    // Error: Private identifiers are only available when targeting ECMAScript 2015 and higher.
    // 설정을 바꿔봤으나 해결이 안된다.
    function CurriedCallback(callback) {
        _CurriedCallback_callback.set(this, void 0);
        __classPrivateFieldSet(this, _CurriedCallback_callback, function (input) {
            console.log("Input", input);
            callback(input);
        }, "f");
    }
    return CurriedCallback;
}());
exports.CurriedCallback = CurriedCallback;
_CurriedCallback_callback = new WeakMap();
new CurriedCallback(function (input) {
    console.log(input.length);
});
new CurriedCallback(function (input) {
    console.log(input.length);
    // Error: Property 'length' does not exist on type 'unknown'.
});
