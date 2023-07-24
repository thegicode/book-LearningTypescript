type ShortPoemBase = { author: string };
type Haiku = ShortPoemBase & { kigo: string; type: "haiku" };
type Villanelle = ShortPoemBase & { meter: number; type: "villanelle" };
type ShortPoem = Haiku | Villanelle;

const oneArt: ShortPoem = {
    // Error : Type '{ author: string; type: "villanelle"; }' is not assignable to type 'ShortPoem'.
    //   Type '{ author: string; type: "villanelle"; }' is not assignable to type 'Villanelle'.
    //   Property 'meter' is missing in type '{ author: string; type: "villanelle"; }' but required in type '{ meter: number; type: "villanelle"; }'.

    author: "Elizabeth Bishop",
    type: "villanelle",
};

export {};
