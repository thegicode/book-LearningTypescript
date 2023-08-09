function get<T>(container: T, key: keyof T) {
    return container[key];
}

const roles = {
    favorite: "fargo",
    others: ["Alomist Famous", "Burn after Reading", "Nomadland"],
};

const found = get(roles, "favorite"); // type: string | string[]

export {};
