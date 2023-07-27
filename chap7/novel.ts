interface Novel {
    author: {
        name: string;
    };
    setting: Setting;
}

interface Setting {
    place: string;
    year: number;
}

let myNovel: Novel;

myNovel = {
    author: {
        name: "Jane Aussten",
    },
    setting: {
        place: "england",
        year: 1812,
    },
};

myNovel = {
    author: {
        name: "Emily Bronte",
    },
    setting: {
        // Error : Property 'year' is missing in type '{ place: string; }' but required in type 'Setting'.
        place: "West Yorkshire",
    },
};
