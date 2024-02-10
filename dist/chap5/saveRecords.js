"use strict";
const records = [];
function saveRecords(newRecords) {
    newRecords.forEach((record) => records.push(record));
}
saveRecords(["21", "Come On Over", "The Bodyguard"]);
