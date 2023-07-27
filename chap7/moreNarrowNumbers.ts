interface MoreNarrowNumbers {
    [i: number]: string;
    [i: string]: string | undefined;
}

const mixesNybersAndStrings: MoreNarrowNumbers = {
    0: "",
    key1: "",
    key2: undefined,
};

interface MoreNarrowStrings {
    [i: number]: string | undefined;
    // Error : 'number' 인덱스 유형 'string | undefined'을(를) 'string' 인텍스 유형 'string'에 할당할 수 없습니다.
    [i: string]: string;
}
