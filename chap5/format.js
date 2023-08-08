"use strict";
// Error : This overload signature is not compatible with its implementation signature.
function format(data, needle, haystack) {
    return needle && haystack ? data.replace(needle, haystack) : data;
}
