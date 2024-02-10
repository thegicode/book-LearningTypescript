class NamedEngineer {
    fullName: string;

    constructor(name: string, public area: string) {
        this.fullName = `${name}, ${area} engineer`;
    }
}

export {};
