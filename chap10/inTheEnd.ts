function inTheEnd<First, Second, Third = number, Foruth = string>() {} // Ok

function inTheMiddle<First, Second = boolean, Third = number, Fourth>() {}
// Error: Required type parameters may not follow optional type parameters.

export {};
