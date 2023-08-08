class CreatePairFacotory<Key> {
    key: Key;

    constructor(key: Key) {
        this.key = key;
    }

    createPair<Value>(value: Value) {
        return {
            key: this.key,
            value,
        };
    }
}

const facotry = new CreatePairFacotory("role");
// type: CreatePairFacotory<stirng>
console.log("facotry: ", facotry);
// Log: CreatePairFacotory { key: 'role' }

const numberPair = facotry.createPair(10);
// type: { key: string, value: number}
console.log("numberPair: ", numberPair);
// Log: { key: 'role', value: 10 }

const stringPair = facotry.createPair("Sophine");
// type: { key: string, value: string }
console.log("stringPair: ", stringPair);
// Log: { key: 'role', value: 'Sophine' }
