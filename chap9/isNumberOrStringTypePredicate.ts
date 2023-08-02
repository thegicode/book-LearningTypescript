function isNumberOrString(value: unknown): value is number | string {
    return ["number", "string"].includes(typeof value);
}

function logValueIfExists(value: number | string | null | undefined) {
    if (isNumberOrString(value)) {
        // value: number | string 타입
        value.toString();
    } else {
        // value: null | undefined의 타입
        console.log("Value does not exist", value);
    }
}

export {};
