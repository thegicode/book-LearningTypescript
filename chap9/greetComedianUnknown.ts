function greetComedian(name: unknown) {
    console.log(`Announcing ${name.toUpperCase()}!`);
    // Error : Property 'toUpperCase' does not exist on type 'unknown'.
}

export {};
