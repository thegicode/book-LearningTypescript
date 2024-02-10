enum StatusCode {
    InternalServerError = 500,
    NotFound = 404,
    Ok = 200,
}

StatusCode.InternalServerError;

let statusCode: StatusCode;

statusCode = StatusCode.Ok; // ok
statusCode = 200; // ok
