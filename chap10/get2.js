"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function get(container, key) {
    return container[key];
}
const roles = {
    favorite: "fargo",
    others: ["Alomist Famous", "Burn after Reading", "Nomadland"],
};
const found = get(roles, "favorite"); // type: string | string[]
