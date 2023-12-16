class NamedEngineer {
    fullName: string;
    area: string;

    constructor(name: string, area: string) {
        this.area = area;
        this.fullName = `${name}, ${area} engineer`;
    }
}

export {};
