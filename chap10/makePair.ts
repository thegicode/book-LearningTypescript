function makePair<Key, Value>(key: Key, value: Value) {
    return { key, value };
}

// Ok: 타입 인수가 둘 다 제공되지 않음
makePair("abc", 123);
// type: {key: string, value: number}

// Ok: 두 개의 타입 인수가 제공됨
makePair<string, number>("abc", 123);
// type: {key: string, value: number}

makePair<string>("abc", 123);
// Error: Expected 2 type arguments, but got 1.
