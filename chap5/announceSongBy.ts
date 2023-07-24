function announceSongBy(song: string, singer: string | undefined) {
    console.log(`Song: ${song}`);

    if (singer) {
        console.log(`Singer: ${singer}`);
    }
}

announceSongBy("Greenleeves");
// Error : Expected 2 arguments, but got 1.
// Logs : Song: Greenleeves
announceSongBy("Greenleeves", undefined);
// Logs : Song: Greenleeves
announceSongBy("Chandelier", "Sia");
// Logs :
// Song: Chandelier
// Singer: Sia
