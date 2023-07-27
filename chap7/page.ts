interface Page {
    readonly text: string;
}

function read(page: Page) {
    console.log(page.text);

    page.text += "!";
    // Error : Cannot assign to 'text' because it is a read-only property.
}
