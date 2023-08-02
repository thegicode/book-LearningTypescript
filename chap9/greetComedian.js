function greetComedian(name) {
    // 타입 오류 없음
    console.log("Announcing ".concat(name.toUpperCase(), "!"));
}
greetComedian({ name: "Bea Arthur" });
