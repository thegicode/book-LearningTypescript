"use strict";
// Ok : author는 undefined으로 제공됨
const hasRequired = {
    author: undefined,
};
const missingRequired = {};
// Error :  Property 'author' is missing in type '{}' but required in type 'Writers'.
