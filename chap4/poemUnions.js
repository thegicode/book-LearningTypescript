const poem = Math.random() > 0.5
    ? { name: "The Double Image", pages: 7, type: "pages" }
    : { name: "Her Kind", rhymes: true, type: "rhymes" };
if (poem.type === "pages") {
    console.log(`It's got pages: ${poem.pages}`);
}
else {
    console.log(`It rhymes: ${poem.rhymes}`);
}
poem.type;
poem.pages;
export {};
