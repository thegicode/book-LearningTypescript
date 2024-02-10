"use strict";
class Secret {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    getValue(key) {
        return this.key === key ? this.value : undefined;
    }
}
const storage = new Secret(12345, "luggage"); // type: Secet<number, string>
storage.getValue(1987); // type: string | undefined
// undefined
