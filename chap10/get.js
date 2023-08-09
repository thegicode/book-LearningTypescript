"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function get(container, key) {
    return container[key];
}
var roles = {
    favorite: "fargo",
    others: ["Alomist Famous", "Burn after Reading", "Nomadland"],
};
var favorite = get(roles, "favorite"); // type: string
var others = get(roles, "others"); // type: string[]
var missing = get(roles, "extras");
