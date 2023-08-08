"use strict";
let physicist = Math.random() > 0.5 ? "Marie Curie" : 84;
physicist.toString();
physicist.toUpperCase();
// Error : Property 'toUpperCase' does not exist on type 'string | number'.
// Property 'toUpperCase' does not exist on type 'number'.
physicist.toFixed();
// Error : Property 'toFixed' does not exist on type 'string | number'.
// Property 'toFixed' does not exist on type 'string'.
