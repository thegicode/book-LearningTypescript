const ratings = {
    imdb: 8.4,
    metacritic: 82,
};

function logRating(key: keyof typeof ratings) {
    console.log(ratings[key]);
}

logRating("imdb"); // Ok

logRating("invalid");
// Error: Argument of type '"invalid"' is not assignable to parameter of type '"imdb" | "metacritic"'

export {};
