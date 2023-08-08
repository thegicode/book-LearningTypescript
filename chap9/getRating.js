"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRating(ratings, key) {
    return ratings[key]; // Ok
}
const ratings = { audience: 66, critics: 84 };
getRating(ratings, "audience"); // Ok
getRating(ratings, "not valid");
