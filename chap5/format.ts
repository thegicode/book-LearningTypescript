function format(data: string): string;

function format(data: string, needle: string, haystack: string): string;

function format(getData: () => string): string;
// Error : This overload signature is not compatible with its implementation signature.

function format(data: string, needle?: string, haystack?: string) {
    return needle && haystack ? data.replace(needle, haystack) : data;
}
