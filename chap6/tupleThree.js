"use strict";
const tupleThree = [false, 1583, "Nzinga"];
const tupleTwoExact = [tupleThree[0], tupleThree[1]];
const tupleTwoExtra = tupleThree;
// Error:  Type '[boolean, number, string]' is not assignable to type '[boolean, number]'.
//  Source has 3 element(s) but target allows only 2.
