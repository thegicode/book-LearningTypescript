interface KeyValuePair<Key, Value = Key> {
    key: Key;
    value: Value;
}

// type: KeyValuePair<string, number>
let allExpicit: KeyValuePair<string, number> = {
    key: "rating",
    value: 10,
};

// type: KeyValuePair<string>
let OneDEfaulting: KeyValuePair<string> = {
    key: "rating",
    value: "ten",
};

let firstMissing: KeyValuePair = {
    // Error: Generic type 'KeyValuePair<Key, Value>' requires between 1 and 2 type arguments.
    key: "rating",
    value: 10,
};

export {};
