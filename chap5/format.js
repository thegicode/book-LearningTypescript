function format(data, needle, haystack) {
    return needle && haystack ? data.replace(needle, haystack) : data;
}
