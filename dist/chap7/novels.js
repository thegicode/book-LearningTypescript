"use strict";
const novels = {
    Outlander: 19991,
    Oroonoko: 1688,
};
const missingOroonoki = {
    // Error : Property 'Oroonoko' is missing in type '{ Outlander: number; }' but required in type 'HistoricalNovels'.
    Outlander: 1991,
};
