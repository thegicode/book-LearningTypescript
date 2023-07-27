interface HistoricalNovels {
    Oroonoko: number;
    [i: string]: number;
}

const novels: HistoricalNovels = {
    Outlander: 19991,
    Oroonoko: 1688,
};

const missingOroonoki: HistoricalNovels = {
    // Error : Property 'Oroonoko' is missing in type '{ Outlander: number; }' but required in type 'HistoricalNovels'.
    Outlander: 1991,
};
