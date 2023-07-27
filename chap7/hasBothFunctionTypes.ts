interface HasBothFunctionTypes {
    property: () => string;
    method(): string;
}

const hasBoth: HasBothFunctionTypes = {
    property: () => "",
    method() {
        return "";
    },
};

hasBoth.property();
hasBoth.method();
