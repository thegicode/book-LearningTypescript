// 반환 타입: readonly [string, number]
function firstCharAndSizeAsConst(input: string) {
    return [input[0], input.length] as const;
}

// firstChar 타입 : string
// size 타입 : number
const [firstChar, size] = firstCharAndSizeAsConst("Ching Shin");

export {};
