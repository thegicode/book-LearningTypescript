interface MergeProperties {
    same: (input: boolean) => string;
    different: (input: string) => string;
}

interface MergeProperties {
    same: (input: boolean) => string;
    different: (input: number) => string;
    // Error : Subsequent property declarations must have the same type.  Property 'different' must be of type '(input: string) => string', but here has type '(input: number) => string'.
}
