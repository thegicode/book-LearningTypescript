const seasonCounts = new Map([
    ["I love Lucy", "6"],
    ["The Golden Grils", "7"],
]);

// 타입: string : undefined
let maybeValue = seasonCounts.get("I love Lucy");

console.log(maybeValue.toUpperCase());
// Error: 'maybeValue'은(는) 'undefined'일 수 있습니다.

// 타입: string
const knownValue = seasonCounts.get("I love Lucy")!;

console.log(knownValue.toUpperCase());

//  1. Map
// Cannot find name 'Map'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2015' or later.
// 구글 검색 결과 :  npm i @types/node 로 해결
// 2. Property 'toUpperCase' does not exist on type 'number'.
// 책에서는 언급이 없다. 코드 예제가 내용에 적당하지 않는 것 같다.
// number를 string으로 바꿔서 적용

export {};
