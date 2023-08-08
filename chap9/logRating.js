"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ratings = {
    imdb: 8.4,
    metacritic: 82,
};
function logRating(key) {
    console.log(ratings[key]);
}
logRating("imdb"); // Ok
logRating("invalid");
