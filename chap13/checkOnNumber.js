function checkOnNumber(containsA) {
    return containsA(1337);
}
function stringContainsA(input) {
    return !!input.match(/a/i);
}
checkOnNumber(stringContainsA);
