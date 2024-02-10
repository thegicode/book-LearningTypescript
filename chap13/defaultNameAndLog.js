"use strict";
function defaultNameAndLog(nameMaybe) {
    const name = nameMaybe ?? "anonymouse";
    console.log("Form", nameMaybe, "to", name);
    return name;
}
