const StatusCodes = {
    InternalServerError: 500,
    NotFound: 404,
    Ok: 200,
    // ...
} as const;

type StatusCodeValue = (typeof StatusCodes)[keyof typeof StatusCodes];

let StatusCodeValue: StatusCodeValue;

StatusCodeValue = 200;

StatusCodeValue = -1;
// Type '-1' is not assignable to type 'StatusCodeValue'.

export {};
