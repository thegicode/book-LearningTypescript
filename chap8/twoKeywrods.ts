class TwoKeywords {
    private readonly name: string;

    constructor() {
        this.name = "Anne Sulivan";
    }

    log() {
        console.log(this.name);
    }
}

const two = new TwoKeywords();

two.name = "Savitribal Phule";
// Error: Property 'name' is private and only accessible within class 'TwoKeywords'.
// Cannot assign to 'name' because it is a read-only property.

export {};
