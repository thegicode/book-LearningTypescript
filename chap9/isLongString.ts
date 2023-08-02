function isLongString(input: string | undefined): input is string {
    return !!(input && input.length >= 7);
}

function workWithText(text: string | undefined) {
    if (isLongString(text)) {
        // text: string의 타입
        console.log("Long text:", text.length);
    } else {
        // text: undefined 타입
        console.log("Short text", text?.length);
        // Error: Property 'length' does not exist on type 'never'.
    }
}

export {};
