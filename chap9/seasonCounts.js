var seasonCounts = new Map([
    ["I love Lucy", 6],
    ["The Golden Grils", 7],
]);
// 타입: string : undefined
var maybeValue = seasonCounts.get("I love Lucy");
console.log(maybeValue.toUpperCase());
// 타입: string
var knownValue = seasonCounts.get("I love Lucy");
console.log(knownValue.toUpperCase());
//  Cannot find name 'Map'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2015' or later.
// 구글 검색 결과 :  npm i @types/node
