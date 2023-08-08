"use strict";
function returnsVoid() {
    return;
}
let lazyValue;
lazyValue = returnsVoid();
// Error : Type 'void' is not assignable to type 'string'.
