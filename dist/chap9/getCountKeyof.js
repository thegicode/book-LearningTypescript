function getCountKeyof(ratings, key) {
    return ratings[key]; // Ok
}
const ratings = { audience: 66, critics: 84 };
getCountKeyof(ratings, "audience"); // Ok
getCountKeyof(ratings, "not valid");
export {};
