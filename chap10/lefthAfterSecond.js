// type: (text: string) => Promise<number>
async function lengthAfterSecond(text) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return text.length;
}
// type: (text: string) => Promise<number>
async function lengthImmediately(text) {
    return text.length;
}
export {};
