function returnsVoid() {
    return;
}

let lazyValue: string | undefined;

lazyValue = returnsVoid();
// Error : Type 'void' is not assignable to type 'string'.
