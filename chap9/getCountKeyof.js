"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCountKeyof(ratings, key) {
    return ratings[key]; // Ok
}
var ratings = { audience: 66, critics: 84 };
getCountKeyof(ratings, "audience"); // Ok
getCountKeyof(ratings, "not valid");
