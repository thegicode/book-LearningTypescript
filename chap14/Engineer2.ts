class Engineer {
    constructor(readonly area: string) {
        console.log(`I work in ther ${area} area`);
    }
}

new Engineer("mechanical").area;

export {};
