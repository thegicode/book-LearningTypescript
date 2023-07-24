const poem =
    Math.random() > 0.5
        ? { name: "The Double Image", pages: 7 }
        : { name: "Her Kind", rhymes: true };

// 타입 :
// {
//     name: string;
//     pages: number;
//     rhymes?: undefined;
// }
// |
// {
//     name: string;
//     pages?: undefined;
//     rhymes: boolean;
// }

console.log(poem.name);
console.log(poem.pages);
console.log(poem.rhymes);

export {};
