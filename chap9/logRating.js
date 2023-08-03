var ratings = {
    imdb: 8.4,
    metacritic: 82,
};
function logRating(key) {
    console.log(ratings[key]);
}
logRating("imdb"); // Ok
logRating("invalid");
