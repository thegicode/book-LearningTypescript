"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ok = {
    author: "Rita Dove",
    pages: 80,
};
const missing = {
    // Error : Property 'pages' is missing in type '{ author: string; }' but required in type 'Book'.
    author: "Rita Dove",
};
