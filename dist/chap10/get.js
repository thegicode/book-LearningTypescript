function get(container, key) {
    return container[key];
}
const roles = {
    favorite: "fargo",
    others: ["Alomist Famous", "Burn after Reading", "Nomadland"],
};
const favorite = get(roles, "favorite"); // type: string
const others = get(roles, "others"); // type: string[]
const missing = get(roles, "extras");
export {};
