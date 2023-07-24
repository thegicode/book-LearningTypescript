type Book = {
    author?: string;
    pages: number;
    // Error : 'pages' is declared here.
};

const ok: Book = {
    author: "Rita Dove",
    pages: 80,
};

const missing: Book = {
    // Error : Property 'pages' is missing in type '{ author: string; }' but required in type 'Book'.
    author: "Rita Dove",
};

export {};
