let lifespan: number | "ongoing" | "uncertaion";

lifespan = 89;
lifespan = "ongoing";

lifespan = true;
// Error: Type 'true' is not assignable to type 'number | "ongoing" | "uncertaion"'.
