let scientist = Math.random() > 0.5 ? "Rosalind Franklin" : 51;

if (scientist === "Rosalind Franklin") {
    scientist.toUpperCase();
}

scientist.toUpperCase();
// Error : Property 'toUpperCase' does not exist on type 'string | number'.
//  Property 'toUpperCase' does not exist on type 'number'.
