/**
 * @param {string} text
 */

function sentenceCase(text) {
    return `${text[0].toUpperCase()} ${text.slice(1)} `;
}

sentenceCase("hello world");

sentenceCase(["hello"], ["world"]);
