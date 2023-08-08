"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function describePrference(preference) {
    switch (preference) {
        case "maybe":
            return "I suppores...";
        case "no":
            return "No thanks.";
        case "yes":
            return "Yes please!";
    }
}
// type: { movie: string, standup: string }
const preferenceMutable = {
    movie: "maybe",
    standup: "yes",
};
describePrference(preferenceMutable.movie);
// Error: Argument of type 'string' is not assignable to parameter of type '"maybe" | "no" | "yes"'.
const preferencesReadonly = {
    movie: "maybe",
    standup: "yes",
};
describePrference(preferencesReadonly.movie);
preferencesReadonly.movie = "no";
