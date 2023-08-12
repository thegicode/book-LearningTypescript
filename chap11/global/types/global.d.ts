import { Data } from "./data";

declare global {
    const globalDeclared: Data;
}

declare const locallyDeclared: Data;
