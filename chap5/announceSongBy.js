function announceSongBy(song, singer) {
    console.log("Song: ".concat(song));
    if (singer) {
        console.log("Singer: ".concat(singer));
    }
}
announceSongBy("Greenleeves");
announceSongBy("Greenleeves", undefined);
announceSongBy("Chandelier", "Sia");
