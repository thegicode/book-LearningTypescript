var StatusCodes = {
    InternalServerError: 500,
    NotFound: 404,
    Ok: 200,
    // ...
};
var StatusCodeValue;
console.log(typeof StatusCodes);
StatusCodeValue = 200;
StatusCodeValue = -1;
// Type '-1' is not assignable to type 'StatusCodeValue'.
