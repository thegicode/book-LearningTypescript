interface ChapterStarts {
    preface: 0;
    [i: string]: number;
}

const correctPreface: ChapterStarts = {
    preface: 0,
    night: 1,
    shopping: 5,
};

const wrongPreface: ChapterStarts = {
    preface: 1,
    // Error :  Type '1' is not assignable to type '0'.
};
