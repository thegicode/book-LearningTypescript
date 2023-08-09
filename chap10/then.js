// type: Promise<string>
var textEventually = new Promise(function (resolve) {
    setTimeout(function () { return resolve("Done!"); }, 1000);
});
// type: Promise<number>
var lengthEvnetually = textEventually.then(function (text) { return text.length; });
