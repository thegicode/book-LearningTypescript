"use strict";
let yearAndWarrior;
yearAndWarrior = [530, "Tomyris"];
yearAndWarrior = [false, "Tomyris"];
// Error : Type 'boolean' is not assignable to type 'number'.
yearAndWarrior = [520];
// Error : Type '[number]' is not assignable to type '[number, string]'
//  Source has 1 element(s) but target requires 2.
