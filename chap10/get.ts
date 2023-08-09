function get<T, Key extends keyof T>(container: T, key: Key) {
    return container[key];
}

const roles = {
    favorite: "fargo",
    others: ["Alomist Famous", "Burn after Reading", "Nomadland"],
};

const favorite = get(roles, "favorite"); // type: string
const others = get(roles, "others"); // type: string[]

const missing = get(roles, "extras");
// Error: Argument of type '"extras"' is not assignable to parameter of type '"favorite" | "others"'.

export {};
