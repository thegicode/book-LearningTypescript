function greetComedian(name: any) {
    // 타입 오류 없음
    console.log(`Announcing ${name.toUpperCase()}!`);
}

greetComedian({ name: "Bea Arthur" });
// Runtime error: name.toUpperCase is not a function

export {};
