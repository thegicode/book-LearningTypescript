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
var preferenceMutable = {
    movie: "maybe",
    standup: "yes",
};
describePrference(preferenceMutable.movie);
var preferencesReadonly = {
    movie: "maybe",
    standup: "yes",
};
describePrference(preferencesReadonly.movie);
preferencesReadonly.movie = "no";
