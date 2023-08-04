const rawData = ["grace", "frankie"];

// 타입: any
JSON.parse(rawData);
// Error: Argument of type 'string[]' is not assignable to parameter of type 'string'.

// 타입: string[]
JSON.parse(rawData) as string[];
// Error: Argument of type 'string[]' is not assignable to parameter of type 'string'.

// 타입: [string, string]
JSON.parse(rawData) as [string, string];
// Error: Argument of type 'string[]' is not assignable to parameter of type 'string'.

// 타입: ["grace", "frankie"]
JSON.parse(rawData) as ["grace", "frankie"];
// Error: Argument of type 'string[]' is not assignable to parameter of type 'string'.

export {};
