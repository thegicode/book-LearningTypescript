"use strict";
const pairMutable = [1157, "tomoe"];
pairMutable[0] = 1247;
const pairAlsoMutable = [1157, "tomoe"];
// Error :  The type 'readonly [1157, "tomoe"]' is 'readonly' and cannot be assigned to the mutable type '[number, string]'.
const pairConst = [1157, "tomoe"];
pairConst[0] = 1247;
// Error : Cannot assign to '0' because it is a read-only property.
