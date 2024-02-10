class MissingInitializer {}
(_a = new MissingInitializer().property) === null || _a === void 0
    ? void 0
    : _a.length;
new MissingInitializer().property.length;
export {};
