function getSongRecordingDate(song) {
    switch (song) {
        case "Strange Fruit":
            return new Date("April 20, 1939");
        case "Greenleeves":
            return "unknown";
        default:
            return undefined;
    }
}
