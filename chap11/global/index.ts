import { Data } from "./types/data";
import { locallyDeclared } from "./types/global";

function logData(data: Data) {
    // Ok
    console.log(`Data version is: ${data.version}`);
}

logData(globalDeclared); // Ok

logData(locallyDeclared);
