"use strict";
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["InternalServerError"] = 500] = "InternalServerError";
    StatusCode[StatusCode["NotFound"] = 404] = "NotFound";
    StatusCode[StatusCode["Ok"] = 200] = "Ok";
})(StatusCode || (StatusCode = {}));
StatusCode.InternalServerError;
let statusCode;
statusCode = StatusCode.Ok; // ok
statusCode = 200; // ok
