import { locallyDeclared } from "./types/global";
function logData(data) {
    // Ok
    console.log(`Data version is: ${data.version}`);
}
logData(globalDeclared); // Ok
logData(locallyDeclared);
