"use strict";
function read(page) {
    console.log(page.text);
    page.text += "!";
    // Error : Cannot assign to 'text' because it is a read-only property.
}
