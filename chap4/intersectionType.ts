type Artwork = {
    genre: string;
    name: string;
};

type Writing = {
    pages: number;
    name: string;
};

type WrittenArt = Artwork & Writing;
// 다음과 같음
// {
//     genre: string;
//     name: string;
//     pages: number;
// }
