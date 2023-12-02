const oneArt = {
    // Error : Type '{ author: string; type: "villanelle"; }' is not assignable to type 'ShortPoem'.
    //   Type '{ author: string; type: "villanelle"; }' is not assignable to type 'Villanelle'.
    //   Property 'meter' is missing in type '{ author: string; type: "villanelle"; }' but required in type '{ meter: number; type: "villanelle"; }'.
    author: "Elizabeth Bishop",
    type: "villanelle",
};
export {};
