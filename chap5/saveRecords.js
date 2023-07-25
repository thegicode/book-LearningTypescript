var records = [];
function saveRecords(newRecords) {
    newRecords.forEach(function (record) { return records.push(record); });
}
saveRecords(["21", "Come On Over", "The Bodyguard"]);
