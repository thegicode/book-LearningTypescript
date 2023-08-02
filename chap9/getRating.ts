import { Ratings } from "./ratings";

function getRating(ratings: Ratings, key: "audience" | "critics"): number {
    return ratings[key]; // Ok
}

const ratings: Ratings = { audience: 66, critics: 84 };

getRating(ratings, "audience"); // Ok

getRating(ratings, "not valid");
// Error: Argument of type '"not valid"' is not assignable to parameter of type '"audience" | "critics"'.

export {};
