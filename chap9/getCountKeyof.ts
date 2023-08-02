import { Ratings } from "./ratings";

function getCountKeyof(ratings: Ratings, key: keyof Ratings): number {
    return ratings[key]; // Ok
}

const ratings: Ratings = { audience: 66, critics: 84 };

getCountKeyof(ratings, "audience"); // Ok

getCountKeyof(ratings, "not valid");
// Error: Argument of type '"not valid"' is not assignable to parameter of type 'keyof Ratings'.

export {};
