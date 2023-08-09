// type: Promise<string>
const textEventually = new Promise<string>((resolve) => {
    setTimeout(() => resolve("Done!"), 1000);
});

// type: Promise<number>
const lengthEvnetually = textEventually.then((text) => text.length);

export {};
