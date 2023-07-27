interface Book {
    author?: string;
    pages: number;
}

const ok: Book = {
    author: "Rita Dove",
    pages: 80,
};

const missing: Book = {
    pages: 880,
};
