function announceSong(song, singer) {
    console.log("Song: ".concat(song));
    if (singer) {
        console.log("Singer: ".concat(singer));
    }
}
announceSong("GreensLeeves");
announceSong("GreensLeeves", undefined);
announceSong("Chandelier", "Sia");
