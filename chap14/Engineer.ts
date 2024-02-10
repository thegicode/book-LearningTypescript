class Engineer {
    readonly area: string;

    constructor(area: string) {
        this.area = area;
        console.log(`I work in ther ${area} area`);
    }
}

new Engineer("mechanical").area;

export {};
