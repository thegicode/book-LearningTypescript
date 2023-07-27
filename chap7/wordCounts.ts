interface WordCounts {
    [i: string]: number;
}

const counts: WordCounts = {};

counts.apple = 0;
counts.banana = 1;

counts.cherry = false;
// Error : Type 'boolean' is not assignable to type 'number'.
