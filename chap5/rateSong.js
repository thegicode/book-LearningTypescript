"use strict";
function rateSong(song, rating = 0) {
    console.log(`${song} gets ${rating}/5 starts!`);
}
rateSong("Photograph");
// Logs : Photograph gets 0/5 starts!
rateSong("Set fire to the Rain", 5);
// Logs : Set fire to the Rain gets 5/5 starts!
rateSong("Set fire to the Rain", undefined);
// Logs : Set fire to the Rain gets 0/5 starts!
rateSong("At Last!", "100");
// Error : Argument of type 'string' is not assignable to parameter of type 'number'.
// Logs : At Last! gets 100/5 starts!
