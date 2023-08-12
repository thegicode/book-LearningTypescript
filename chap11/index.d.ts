interface Writer {} // Ok
declare interface Writer {} // Ok

declare const fullName: string; // Ok: 타입은 원시 타입 string
declare const firstName: "Liz"; // Ok: 타입은 리터럴 값

const lastName = "lemon";
// Error: Top-level declarations in .d.ts files must start with either a 'declare' or 'export' modifier.
