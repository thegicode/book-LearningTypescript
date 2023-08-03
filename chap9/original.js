var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var original = {
    medium: "movie",
    title: "Mean Girls",
};
var adaptation;
if (Math.random() > 0.5) {
    adaptation = __assign(__assign({}, original), { medium: "play" }); // Ok
}
else {
    adaptation = __assign(__assign({}, original), { medium: 2 });
}
