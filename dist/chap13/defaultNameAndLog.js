"use strict";
function defaultNameAndLog(nameMaybe) {
    const name = nameMaybe !== null && nameMaybe !== void 0 ? nameMaybe : "anonymouse";
    console.log("Form", nameMaybe, "to", name);
    return name;
}
