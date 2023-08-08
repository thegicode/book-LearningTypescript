"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function greetComedian(name) {
    // 타입 오류 없음
    console.log(`Announcing ${name.toUpperCase()}!`);
}
greetComedian({ name: "Bea Arthur" });
