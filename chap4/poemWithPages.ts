type PoemWithPages = {
    name: string;
    pages: number;
};

type PoemWithRhymes = {
    name: string;
    rhymes: boolean;
};

type Poem = PoemWithPages | PoemWithRhymes;

const poem: Poem =
    Math.random() > 0.5
        ? { name: "The Double Image", pages: 7 }
        : { name: "Her Kind", rhymes: true };

poem.name; // Ok

poem.pages;
// Error : Property 'pages' does not exist on type 'Poem'.
// Property 'pages' does not exist on type 'PoemWithRhymes'.

poem.rhymes;
// Error :  Property 'rhymes' does not exist on type 'Poem'.
// Property 'rhymes' does not exist on type 'PoemWithPages'.

if (poem.pages) {
    // Error : Property 'pages' does not exist on type 'Poem'.
    // Property 'pages' does not exist on type 'PoemWithRhymes'.
}

export {};
