function makePair(key, value) {
    return { key: key, value: value };
}
// Ok: 타입 인수가 둘 다 제공되지 않음
makePair("abc", 123);
// type: {key: string, value: number}
// Ok: 두 개의 타입 인수가 제공됨
makePair("abc", 123);
// type: {key: string, value: number}
makePair("abc", 123);
