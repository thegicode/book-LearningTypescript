function rateSong(song, rating) {
    if (rating === void 0) { rating = 0; }
    console.log("".concat(song, " gets ").concat(rating, "/5 starts!"));
}
rateSong("Photograph");
// Logs : Photograph gets 0/5 starts!
rateSong("Set fire to the Rain", 5);
rateSong("Set fire to the Rain", undefined);
rateSong("At Last!", "100");
//  Argument of type 'string' is not assignable to parameter of type 'number'.
