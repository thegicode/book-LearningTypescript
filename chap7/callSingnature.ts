type FunctionAlias = (input: string) => number;

interface CallSignature {
    (input: string): number;
}

// 타입: (input: string) => number
const typedFunctioinAlias: FunctionAlias = (input) => input.length;

// 타입: (nput: string) => number
const typedCallSignature: CallSignature = (input) => input.length;
