"use strict";
let myNovel;
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
