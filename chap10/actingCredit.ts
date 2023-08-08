interface ActingCredit<Role> {
    role: Role;
}

class MoviePart implements ActingCredit<string> {
    role: string;
    speaking: boolean;

    constructor(role: string, speaking: boolean) {
        this.role = role;
        this.speaking = speaking;
    }
}

const part = new MoviePart("Miranda Priestly", true);

const a = part.role; // type: string
console.log(a); // Log:  Miranda Priestly

class IncorrectExtension implements ActingCredit<string> {
    role: boolean;
    // Error: Property 'role' in type 'IncorrectExtension' is not assignable to the same property in base type 'ActingCredit<string>'.
    //   Type 'boolean' is not assignable to type 'string'.
}

export {};
