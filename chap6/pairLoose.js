"use strict";
// 타입: (boolean | number)[]
const pairLoose = [false, 123];
const pairTupleLoose = pairLoose;
// Error : Type '(number | boolean)[]' is not assignable to type '[boolean, number]'.
//  Target requires 2 element(s) but source may have fewer.
