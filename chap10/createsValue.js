// type: (input: string) => number
var creater;
creater = function (text) { return text.length; }; // Ok
creater = function (text) { return text.toUpperCase(); };
